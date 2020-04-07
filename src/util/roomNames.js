const roomNames = [
  'Nemo',
  'Bonnie',
  'Clyde',
  'Fuzzy',
  'Red',
  'Frozen',
  'Gaia',
  'Piccola',
  'Juno',
  'Snow',
  'Oreo',
  'Bran',
  'Pandora',
  'Katniss',
  'Kong',
  'Kitty',
  'Wasabi',
  'Salem',
  'Noopy',
  'Mili',
];

export const getRoomName = liveRooms => {
  for (let i = 0; i < roomNames.length; i++) {
    let found = false;
    for (let j = 0; j < liveRooms.length; j++) {
      if (roomNames[i] === liveRooms[j].uniqueName) {
        found = true;
        break;
      }
    }
    if (found === false) return roomNames[i];
  }
};

export default roomNames;
