import PageTitle from "../components/layout/PageTitle";
import GameCard from "../components/games/GameCard";
import { gameRegistry } from "../games/core/GameRegistry";
import { useWords } from "../app/providers";
export default function GameArena() {
  const t = useWords();
  return (
    <>
      <PageTitle title={t("games")} sub={t("adventurePlay")} />
      <div className="adventure-games">
        {gameRegistry
          .filter((g) => g.route)
          .map((g) => (
            <GameCard
              key={g.id}
              title={g.title}
              route={g.route}
              preview={g.status === "practice-preview"}
            />
          ))}
      </div>
      <details className="planned-catalog">
        <summary>
          {t("comingSoon")} · {gameRegistry.filter((g) => !g.route).length}
        </summary>
        <div className="adventure-games">
          {gameRegistry
            .filter((g) => !g.route)
            .map((g) => (
              <GameCard key={g.id} title={g.title} route={null} />
            ))}
        </div>
      </details>
    </>
  );
}
