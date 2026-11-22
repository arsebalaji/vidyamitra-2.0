import { useState } from "react";
import {useTranslation} from "react-i18next";
import {
  Check,
  Gamepad2,
  Lightbulb,
  Medal,
  RotateCcw,
  Sparkles,
  Star as StarIcon,
} from "lucide-react";
import { gameRound, equivalent } from "../features/adaptive-learning/engine";

interface Props {
  lang: "te" | "en" | "hi";
  onAttempt: (correct: boolean, round: number) => Promise<void>;
}
export default function PlayGarden({ lang, onAttempt }: Props) {
  const {t}=useTranslation();
  const te = lang === "te",
    [round, setRound] = useState(0),
    [score, setScore] = useState(0),
    [chosen, setChosen] = useState<string | null>(null),
    [saving, setSaving] = useState(false);
  const { n, d, answer, options } = gameRound(round),
    good = chosen !== null && equivalent(chosen, answer);
  async function pick(value: string) {
    if (chosen !== null || saving) return;
    setChosen(value);
    setSaving(true);
    const correct = equivalent(value, answer);
    if (correct) setScore((s) => s + 1);
    try {
      await onAttempt(correct, round);
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="play-garden">
      <div className="garden-top">
        <div className="garden-label">
          <Gamepad2 size={18} />
          {t('gamePlayground')}
        </div>
        <div className="garden-score">
          <Medal size={19} />
          <strong>{score}</strong>
          <span>{t('score')}</span>
        </div>
      </div>
      <div className="garden-intro">
        <span className="garden-kicker">
          {t('gameKicker')}
        </span>
        <h2>{t('gameTitle')}</h2>
        <p>
          {t('gameBody')}
        </p>
      </div>
      <div className="garden-stage">
        <div className="floating-shape shape-a" aria-hidden="true">
          ✦
        </div>
        <div className="floating-shape shape-b" aria-hidden="true">
          +
        </div>
        <div className="floating-shape shape-c" aria-hidden="true">
          ✧
        </div>
        <div className="garden-mitra">
          <div className="speech-cloud">
            {chosen
              ? good
                ? t('gameFound')
                : t('gameTogether')
              : t('gameEncourage')}
          </div>
          <img
            src="/mascots/mitra-happy.svg"
            alt="Mitra"
            width="155"
            height="155"
          />
        </div>
        <div className="target-fraction">
          <span className="target-label">
            {t('gameTarget')}
          </span>
          <div dir="ltr" className="stacked-fraction" aria-label={`${n}/${d}`}>
            <span>{n}</span>
            <i />
            <span>{d}</span>
          </div>
          <div className="target-dots" aria-hidden="true">
            {Array.from({ length: d }, (_, i) => (
              <span className={i < n ? "lit" : ""} key={i} />
            ))}
          </div>
        </div>
        <div className="garden-orbit" aria-hidden="true" />
      </div>
      <div className="garden-options">
        {options.map((o, i) => {
          const selected = chosen === o,
            correct = chosen !== null && equivalent(o, answer);
          return (
            <button
              className={`garden-option option-${i} ${selected ? "picked" : ""} ${correct ? "is-correct" : ""} ${selected && !good ? "is-incorrect" : ""}`}
              key={o}
              disabled={chosen !== null || saving}
              onClick={() => pick(o)}
            >
              <span className="option-letter">{["A", "B", "C"][i]}</span>
              <strong dir="ltr">{o}</strong>
              <span className="option-end">
                {correct ? (
                  <Check size={22} />
                ) : (
                  <span className="option-dot" />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className={"garden-feedback " + (chosen ? "has-feedback" : "")}
        aria-live="polite"
      >
        {chosen ? (
          <>
            <div>
              <strong>
                {good
                  ? t('correct')
                  : t('incorrect')}
              </strong>
              <p>
                {n}/{d} × 2/2 = {answer}
              </p>
            </div>
            <button
              className="button"
              disabled={saving}
              onClick={() => {
                setRound((r) => r + 1);
                setChosen(null);
              }}
            >
              <RotateCcw size={17} />
              {t('reset')}
            </button>
          </>
        ) : (
          <>
            <Lightbulb size={20} />
            <p>
              {t('gameHint')}
            </p>
          </>
        )}
      </div>
      <div className="garden-bottom">
        <span>
          <Sparkles size={16} />
          {t('gameNoPressure')}
        </span>
        <div
          aria-label={t('score')}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon
              size={19}
              key={i}
              className={i < score ? "earned-star" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

