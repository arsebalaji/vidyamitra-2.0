export const getBoards = async (stateId: string) =>
  stateId === "telangana"
    ? [
        {
          id: "ts-scert",
          stateId,
          name: "Telangana State Board",
          enabled: true,
        },
      ]
    : [];
