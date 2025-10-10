import { Waiting } from "@renderer/types/domain";

const MOCK: Waiting[] = [
  {
    waitingId: "1",
    phoneNumber: "01012341234",
    adult: 1,
    infant: 0,
    number: 2,
    callCount: 3,
    lastCallTime: "2025-01-01 12:00:00",
    state: "WAITING",
    createdAt: "2025-01-01 12:00:00",
  },
  {
    waitingId: "2",
    phoneNumber: "01012345679",
    adult: 2,
    infant: 1,
    number: 44,
    callCount: 0,
    lastCallTime: "2025-01-01 12:00:00",
    state: "WAITING",
    createdAt: "2025-01-01 12:00:00",
  },
  {
    waitingId: "3",
    phoneNumber: "01010101010",
    adult: 10,
    infant: 3,
    number: 555,
    callCount: 1,
    lastCallTime: "2025-01-01 12:00:00",
    state: "WAITING",
    createdAt: "2025-01-01 12:00:00",
  },
  {
    waitingId: "4",
    phoneNumber: "01010101010",
    adult: 3,
    infant: 3,
    number: 556,
    callCount: 10,
    lastCallTime: "2025-01-01 12:00:00",
    state: "WAITING",
    createdAt: "2025-01-01 12:00:00",
  },
];

export default MOCK;
