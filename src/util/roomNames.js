const roomNames = ['Szabo', 'Satoshi', 'Vitalik', 'Wences', 'Bitcoin', 'Ethereum', 'Litecoin', 'Ren'];

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
