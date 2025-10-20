// helpers/getGameIcon.ts
export const getGameIcon = (name: string): string => {
    const map: Record<string, string> = {
      steam: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
      epic: "https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg",
      valorant: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png",
      cs2: "https://static.wikia.nocookie.net/logopedia/images/4/49/Counter-Strike_2_%28Icon%29.png/revision/latest?cb=20230330015359",
    };
  
    // normalize name to lowercase and remove spaces for flexibility
    const key = name.toLowerCase().replace(/\s+/g, "");
    return map[key] || "/icons/default-game.svg"; // fallback icon
  };
  