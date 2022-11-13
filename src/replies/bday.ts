import { Replies } from ".";

export const BDAY_REPLIES: Replies = [
    "Happy Birthday!",
    "Happy Birthday, [[name]]!",
    "I wonder whos Birthday today is...",
    "Surprise! Happy Birthday!",
    "Didn't expect this, huh? Happy Birthday!",
    "[[name]]...I have two words: Happy Birthday!"
]

export const BDAY_YEAR_REPLIES: Replies = [
    ...BDAY_REPLIES,
    "Wow you turned [[year]] years old! Happy Birthday.",
    "Someone is [[year]] years old now!",
    "Are you [[year]] years old today?"
]