const state = {
  bravery: 0,
  fear: 0,
  curiosity: 0,
  awareness: 0,
  loopCount: 0,
  currentScene: "S1"
};

const scenes = {
  S1: {
    text: `You open your eyes.

The glow of your phone screen hits your face.

23:59

You lock the phone.
You open it again.

23:59

The room is too quiet.
No traffic.
No voices.
Nothing.`,
    choices: [
      {
        text: "Check the phone",
        next: "S2_PHONE",
        effect: { curiosity: 1 }
      },
      {
        text: "Open the door",
        next: "S2_DOOR",
        effect: { bravery: 1 }
      },
      {
        text: "Look out the window",
        next: "S2_WINDOW",
        effect: { curiosity: 1 }
      }
    ]
  },

  S2_PHONE: {
    text: `Your phone vibrates.

Unknown number.

A message appears:

“YOU TRIED. YOU FAILED AGAIN.”

Another message follows immediately:

“This time, do something different.”`,
    choices: [
      {
        text: "Reply to the message",
        next: "S3_REPLY",
        effect: { curiosity: 1 }
      },
      {
        text: "Turn the phone off",
        next: "S3_IGNORE",
        effect: { fear: 1 }
      },
      {
        text: "Investigate the number",
        next: "S3_SEARCH",
        effect: { curiosity: 1 }
      }
    ]
  },

  S2_DOOR: {
    text: `You open the door.

The corridor is dark.

A wall clock at the end of the hall also shows 23:59.

Then a voice behind you whispers:

“Are you going to make the same mistake again?”`,
    choices: [
      {
        text: "Follow the voice",
        next: "S3_VOICE",
        effect: { bravery: 1, curiosity: 1 }
      },
      {
        text: "Run to the stairs",
        next: "S3_STAIRS",
        effect: { fear: 1 }
      },
      {
        text: "Go back into your room",
        next: "S3_RETURN",
        effect: { fear: 1 }
      }
    ]
  },

  S2_WINDOW: {
    text: `You move the curtain aside.

The street is empty.

Except for one man.

He stands in the middle of the road, motionless, staring directly at you.

Then he slowly raises a hand...
and points at the building entrance.`,
    choices: [
      {
        text: "Keep watching him",
        next: "S3_OBSERVE",
        effect: { curiosity: 1 }
      },
      {
        text: "Close the curtain",
        next: "S3_HIDE",
        effect: { fear: 1 }
      },
      {
        text: "Go downstairs and face him",
        next: "S3_STREET",
        effect: { bravery: 1 }
      }
    ]
  },

  S3_REPLY: {
    text: `You type:

“Who are you?”

The reply comes instantly:

“I am you.
Just later.”`,
    choices: [
      {
        text: "Ask: 'What do you mean?'",
        next: "S4_SELF_TEXT",
        effect: { curiosity: 1 }
      },
      {
        text: "Call the number",
        next: "S4_CALL",
        effect: { bravery: 1 }
      },
      {
        text: "Throw the phone away",
        next: "LOOP_1",
        effect: { fear: 1 }
      }
    ]
  },

  S3_IGNORE: {
    text: `You turn the phone off.

Three seconds later, it turns itself back on.

A single line appears on the screen:

“You cannot hide from time.”`,
    choices: [
      {
        text: "Hide the phone",
        next: "S4_HIDEPHONE",
        effect: { fear: 1 }
      },
      {
        text: "Open the message again",
        next: "S4_REOPEN",
        effect: { curiosity: 1 }
      },
      {
        text: "Leave the room",
        next: "S2_DOOR",
        effect: { bravery: 1 }
      }
    ]
  },

  S3_SEARCH: {
    text: `You search the number.

No results.

But in your contacts, the same number is saved under a strange name:

“23:59”

You do not remember saving it.`,
    choices: [
      {
        text: "Open the contact card",
        next: "S4_CONTACT",
        effect: { curiosity: 1 }
      },
      {
        text: "Check your call logs",
        next: "S4_LOGS",
        effect: { awareness: 1 }
      },
      {
        text: "Try to shut the phone down completely",
        next: "LOOP_1",
        effect: { fear: 1 }
      }
    ]
  },

  S3_VOICE: {
    text: `You move toward the voice.

The bathroom light is on.

In the mirror, your reflection is delayed by a second.

It smiles after you stop moving.`,
    choices: [
      {
        text: "Walk closer to the mirror",
        next: "S4_MIRROR",
        effect: { curiosity: 1 }
      },
      {
        text: "Step away",
        next: "S3_STAIRS",
        effect: { fear: 1 }
      },
      {
        text: "Touch the mirror",
        next: "S4_TOUCH_MIRROR",
        effect: { bravery: 1, awareness: 1 }
      }
    ]
  },

  S3_STAIRS: {
    text: `You run toward the stairs.

But the building feels wrong.

You keep going down...
yet the floors never end.

On the third floor, one apartment door is slightly open.`,
    choices: [
      {
        text: "Enter the open apartment",
        next: "S4_OPENFLAT",
        effect: { bravery: 1 }
      },
      {
        text: "Keep going down",
        next: "LOOP_1",
        effect: { fear: 1 }
      },
      {
        text: "Return to your floor",
        next: "S3_RETURN",
        effect: { curiosity: 1 }
      }
    ]
  },

  S3_RETURN: {
    text: `You return to your room.

Something is different.

A chair has moved.
A drawer is half open.
A photo lies on the desk where nothing was before.`,
    choices: [
      {
        text: "Look at the photo",
        next: "S4_PHOTO",
        effect: { curiosity: 1 }
      },
      {
        text: "Open the drawer",
        next: "S4_DRAWER",
        effect: { curiosity: 1 }
      },
      {
        text: "Sit on the bed and do nothing",
        next: "LOOP_1",
        effect: { fear: 1 }
      }
    ]
  },

  S3_OBSERVE: {
    text: `The man does not move.

He tilts his head slightly and points once more toward the building entrance.

Your phone vibrates in your pocket.

23:59`,
    choices: [
      {
        text: "Look at the entrance",
        next: "S4_ENTRANCE",
        effect: { curiosity: 1 }
      },
      {
        text: "Open the window and shout",
        next: "S4_SHOUT",
        effect: { bravery: 1 }
      },
      {
        text: "Step back from the window",
        next: "S3_HIDE",
        effect: { fear: 1 }
      }
    ]
  },

  S3_HIDE: {
    text: `You close the curtain.

A second later, a light tapping sound comes from the glass.

One tap.
Then silence.`,
    choices: [
      {
        text: "Open the curtain again",
        next: "S3_OBSERVE",
        effect: { curiosity: 1 }
      },
      {
        text: "Check the drawer near the bed",
        next: "S4_DRAWER",
        effect: { curiosity: 1 }
      },
      {
        text: "Cover your ears and wait",
        next: "LOOP_1",
        effect: { fear: 1 }
      }
    ]
  },

  S3_STREET: {
    text: `You rush downstairs and step outside.

The street is empty.

The man is gone.

On the wet road, a broken watch lies under a streetlight.

It also shows 23:59.`,
    choices: [
      {
        text: "Pick up the watch",
        next: "S4_BROKENWATCH",
        effect: { awareness: 1 }
      },
      {
        text: "Search the street",
        next: "S4_STREETLOOK",
        effect: { curiosity: 1 }
      },
      {
        text: "Go back inside",
        next: "S4_ENTRANCE",
        effect: { fear: 1 }
      }
    ]
  },

  S4_SELF_TEXT: {
    text: `A new message appears:

“You asked that in the first loop too.”

First loop?

The screen flickers.`,
    choices: [
      {
        text: "Ask: 'How many loops?'",
        next: "S5_COUNT",
        effect: { awareness: 1 }
      },
      {
        text: "Ask: 'What happened to me?'",
        next: "S5_WHATHAPPENED",
        effect: { curiosity: 1 }
      },
      {
        text: "Stop replying",
        next: "S5_COMMON_CLUE",
        effect: { fear: 1 }
      }
    ]
  },

  S4_CALL: {
    text: `You call the number.

At first, only breathing.

Then your own voice answers:

“You do not remember this night because if you do...
you will have to live with it.”`,
    choices: [
      {
        text: "Keep listening",
        next: "S5_RECORDING",
        effect: { awareness: 1 }
      },
      {
        text: "Hang up",
        next: "LOOP_2",
        effect: { fear: 1 }
      },
      {
        text: "Ask: 'What am I running from?'",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      }
    ]
  },

  S4_HIDEPHONE: {
    text: `You hide the phone.

A sentence slowly appears on the wall in front of you:

“You can hide the device.
Not the time.”`,
    choices: [
      {
        text: "Touch the writing",
        next: "S5_COMMON_CLUE",
        effect: { bravery: 1, awareness: 1 }
      },
      {
        text: "Leave the room",
        next: "S2_DOOR",
        effect: { fear: 1 }
      },
      {
        text: "Take the phone back",
        next: "S4_REOPEN",
        effect: { curiosity: 1 }
      }
    ]
  },

  S4_REOPEN: {
    text: `You unlock the phone again.

One photo fills the screen:

A rainy road.
A damaged car.
Blood on glass.`,
    choices: [
      {
        text: "Zoom in on the photo",
        next: "S5_TRUTH_HINT",
        effect: { awareness: 1 }
      },
      {
        text: "Try to delete it",
        next: "LOOP_2",
        effect: { fear: 1 }
      },
      {
        text: "Open the gallery",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      }
    ]
  },

  S4_CONTACT: {
    text: `The contact card shows your own old number.

The saved name is not “Me.”
It is “Do Not Ignore.”`,
    choices: [
      {
        text: "Call the number",
        next: "S4_CALL",
        effect: { bravery: 1 }
      },
      {
        text: "Read the contact notes",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1, awareness: 1 }
      },
      {
        text: "Close the contact card",
        next: "S5_COMMON_CLUE",
        effect: { fear: 1 }
      }
    ]
  },

  S4_LOGS: {
    text: `You open the call history.

The same number appears again and again.

Every call was made at exactly 23:59.`,
    choices: [
      {
        text: "Open the oldest log",
        next: "S5_TRUTH_HINT",
        effect: { awareness: 1 }
      },
      {
        text: "Open the latest log",
        next: "S5_COMMON_CLUE",
        effect: { curiosity: 1 }
      },
      {
        text: "Close the logs",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S4_MIRROR: {
    text: `You stand in front of the mirror.

The person inside looks like you...
but older, exhausted, damaged.

When you whisper “Who are you?”,
it answers:

“You, after the truth.”`,
    choices: [
      {
        text: "Speak to it",
        next: "S5_COMMON_CLUE",
        effect: { bravery: 1 }
      },
      {
        text: "Shut your eyes",
        next: "LOOP_2",
        effect: { fear: 1 }
      },
      {
        text: "Study it carefully",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1, awareness: 1 }
      }
    ]
  },

  S4_TOUCH_MIRROR: {
    text: `Your fingers touch the glass.

It ripples like water.

A flash strikes your mind:

Rain.
A scream.
A car door.
Red lights in the dark.`,
    choices: [
      {
        text: "Push deeper into the vision",
        next: "S6_MEMORY_GATE",
        effect: { bravery: 1, awareness: 1 }
      },
      {
        text: "Pull your hand back",
        next: "S5_COMMON_CLUE",
        effect: { fear: 1 }
      },
      {
        text: "Try to understand the memory",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      }
    ]
  },

  S4_OPENFLAT: {
    text: `The apartment is empty.

A television is on.

It shows security camera footage of the street outside.

The same man stands there, waiting.`,
    choices: [
      {
        text: "Watch the screen carefully",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      },
      {
        text: "Search the apartment",
        next: "S5_COMMON_CLUE",
        effect: { bravery: 1 }
      },
      {
        text: "Leave immediately",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S4_PHOTO: {
    text: `The photo shows you and a woman.

Her face is scratched out.

On the back of the photo, someone wrote:

“You did not say sorry that night.”`,
    choices: [
      {
        text: "Try to remember who she is",
        next: "S6_WOMAN_REVEAL",
        effect: { awareness: 1 }
      },
      {
        text: "Look again at the writing",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      },
      {
        text: "Tear the photo apart",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S4_DRAWER: {
    text: `Inside the drawer, you find three things:

- A broken car key
- A hospital wristband
- An unfinished letter`,
    choices: [
      {
        text: "Take the car key",
        next: "S5_TRUTH_HINT",
        effect: { awareness: 1 }
      },
      {
        text: "Read the hospital band",
        next: "S5_COMMON_CLUE",
        effect: { curiosity: 1 }
      },
      {
        text: "Read the unfinished letter",
        next: "S6_WOMAN_REVEAL",
        effect: { bravery: 1, awareness: 1 }
      }
    ]
  },

  S4_ENTRANCE: {
    text: `You stand at the building entrance.

A convex mirror hangs on the wall.

In the mirror, someone stands behind you.

When you turn around, no one is there.`,
    choices: [
      {
        text: "Look into the mirror again",
        next: "S5_COMMON_CLUE",
        effect: { curiosity: 1 }
      },
      {
        text: "Go out into the street",
        next: "S3_STREET",
        effect: { bravery: 1 }
      },
      {
        text: "Get into the elevator",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S4_SHOUT: {
    text: `You shout through the window:

“Who are you?!”

The man answers from below:

“I stay here until you remember.”`,
    choices: [
      {
        text: "Go downstairs",
        next: "S3_STREET",
        effect: { bravery: 1 }
      },
      {
        text: "Ask what you must remember",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      },
      {
        text: "Close the window",
        next: "S3_HIDE",
        effect: { fear: 1 }
      }
    ]
  },

  S4_BROKENWATCH: {
    text: `On the back of the watch, a message is engraved:

“Face it before 00:00.”`,
    choices: [
      {
        text: "Think about the message",
        next: "S5_COMMON_CLUE",
        effect: { awareness: 1 }
      },
      {
        text: "Put the watch in your pocket",
        next: "S5_COMMON_CLUE",
        effect: { curiosity: 1 }
      },
      {
        text: "Throw the watch away",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S4_STREETLOOK: {
    text: `You walk through the empty street.

For one brief second, under the rain, you see the outline of a crashed car.

Then it disappears.`,
    choices: [
      {
        text: "Move toward where it appeared",
        next: "S6_MEMORY_GATE",
        effect: { bravery: 1, awareness: 1 }
      },
      {
        text: "Look back at the apartment",
        next: "S5_TRUTH_HINT",
        effect: { curiosity: 1 }
      },
      {
        text: "Run away from the street",
        next: "LOOP_2",
        effect: { fear: 1 }
      }
    ]
  },

  S5_COMMON_CLUE: {
    text: `You feel it now.

This night is not random.

Something happened.

Something terrible.

And every strange detail around you points to one truth:

You are not trapped in time.
You are trapped in refusal.`,
    choices: [
      {
        text: "Force yourself to remember",
        next: "S6_MEMORY_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Find the man outside",
        next: "S6_FIND_MAN",
        effect: { bravery: 1 }
      },
      {
        text: "Reject everything",
        next: "LOOP_3",
        effect: { fear: 1 }
      }
    ]
  },

  S5_COUNT: {
    text: `A message arrives:

“This is your ninth loop.”

Ninth.

You suddenly understand that the fear you feel is older than tonight.`,
    choices: [
      {
        text: "Ask why you always fail",
        next: "S6_MEMORY_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Ask how to stop it",
        next: "S6_FIND_MAN",
        effect: { curiosity: 1 }
      },
      {
        text: "Delete the message",
        next: "LOOP_3",
        effect: { fear: 1 }
      }
    ]
  },

  S5_WHATHAPPENED: {
    text: `The screen lights up again:

“That night, you left someone behind.”`,
    choices: [
      {
        text: "Ask who",
        next: "S6_WOMAN_REVEAL",
        effect: { curiosity: 1 }
      },
      {
        text: "Ask if it was your fault",
        next: "S6_GUILT",
        effect: { awareness: 1 }
      },
      {
        text: "Refuse to believe it",
        next: "LOOP_3",
        effect: { fear: 1 }
      }
    ]
  },

  S5_RECORDING: {
    text: `The recording continues.

“She was still in the car.
And you walked away.”`,
    choices: [
      {
        text: "Remember everything",
        next: "S6_MEMORY_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Listen again",
        next: "S6_GUILT",
        effect: { curiosity: 1 }
      },
      {
        text: "End the call",
        next: "LOOP_3",
        effect: { fear: 1 }
      }
    ]
  },

  S5_TRUTH_HINT: {
    text: `The fragments become clearer.

Rain.
A crash.
A woman.
A fight.
A choice you cannot forgive.

You still do not remember the full truth,
but now you know the shape of it.`,
    choices: [
      {
        text: "Remember the woman",
        next: "S6_WOMAN_REVEAL",
        effect: { awareness: 1 }
      },
      {
        text: "Remember the crash",
        next: "S6_MEMORY_GATE",
        effect: { curiosity: 1 }
      },
      {
        text: "Deny it all",
        next: "LOOP_3",
        effect: { fear: 1 }
      }
    ]
  },

  S6_MEMORY_GATE: {
    text: `The memory hits you in broken flashes.

Rain pouring over the windshield.

A heated argument.

The woman crying.

The impact.

The car twisted.

You got out.

But you did not pull her out.

You left.`,
    choices: [
      {
        text: "Accept the full truth",
        next: "S7_FULL_MEMORY",
        effect: { awareness: 1 }
      },
      {
        text: "Defend yourself",
        next: "S7_DENIAL",
        effect: { fear: 1 }
      },
      {
        text: "Find the man first",
        next: "S6_FIND_MAN",
        effect: { bravery: 1 }
      }
    ]
  },

  S6_WOMAN_REVEAL: {
    text: `You remember her.

She was someone you loved.

Or used to.

That night, she asked you not to leave.

But you did.

And after the crash, you left again.`,
    choices: [
      {
        text: "Face what happened to her",
        next: "S7_FULL_MEMORY",
        effect: { awareness: 1 }
      },
      {
        text: "Refuse to accept she is gone",
        next: "S7_DENIAL",
        effect: { fear: 1 }
      },
      {
        text: "Talk to the man outside first",
        next: "S6_FIND_MAN",
        effect: { bravery: 1 }
      }
    ]
  },

  S6_GUILT: {
    text: `Now you understand the deeper truth.

The loop was not born from the accident.

It was born from your refusal to carry the guilt.`,
    choices: [
      {
        text: "Accept your guilt",
        next: "S7_FULL_MEMORY",
        effect: { awareness: 1 }
      },
      {
        text: "Try to forgive yourself",
        next: "S7_CONFRONT_MAN",
        effect: { curiosity: 1 }
      },
      {
        text: "Bury it all again",
        next: "LOOP_4",
        effect: { fear: 1 }
      }
    ]
  },

  S6_FIND_MAN: {
    text: `You find him at last.

Under a dim streetlight.

He turns toward you.

It is you.

Older.
Exhausted.
Broken.

He speaks softly:

“I am the version of you that chose to remember.”`,
    choices: [
      {
        text: "Ask him to explain everything",
        next: "S7_CONFRONT_MAN",
        effect: { curiosity: 1 }
      },
      {
        text: "Say he cannot be you",
        next: "S7_DENIAL",
        effect: { fear: 1 }
      },
      {
        text: "Say you want to end this",
        next: "S7_FINAL_GATE",
        effect: { bravery: 1 }
      }
    ]
  },

  S7_CONFRONT_MAN: {
    text: `He tells you the truth.

Every loop, you reached the edge.
Every loop, you stepped back.

“You think remembering will destroy you,” he says.
“But denial already did.”`,
    choices: [
      {
        text: "Go to the crash site",
        next: "S7_FINAL_GATE",
        effect: { bravery: 1 }
      },
      {
        text: "Ask to hear her voice",
        next: "S7_FINAL_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Run away",
        next: "LOOP_4",
        effect: { fear: 1 }
      }
    ]
  },

  S7_FULL_MEMORY: {
    text: `You remember everything now.

The rain.
The anger.
The crash.
The silence after impact.

You did not kill her with intention.

But you left her there.

And that truth became your prison.`,
    choices: [
      {
        text: "Accept what you did",
        next: "S7_FINAL_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Let guilt consume you",
        next: "ENDING_DARK_GUILT",
        effect: { fear: 1 }
      },
      {
        text: "Try to live with the truth",
        next: "S7_FINAL_GATE",
        effect: { curiosity: 1 }
      }
    ]
  },

  S7_DENIAL: {
    text: `No.

You reject it.

The buildings around you distort.
The street bends.
Phones ring from empty windows.

The time 23:59 appears everywhere.

The world cannot hold your lie anymore.`,
    choices: [
      {
        text: "Keep denying it",
        next: "ENDING_ENDLESS_LOOP",
        effect: { fear: 1 }
      },
      {
        text: "Turn back at the last second",
        next: "S7_FINAL_GATE",
        effect: { awareness: 1 }
      },
      {
        text: "Attack the man outside",
        next: "ENDING_BECOME_THE_MAN",
        effect: { bravery: 1 }
      }
    ]
  },

  S7_FINAL_GATE: {
    text: `You stand at the place where the crash happened.

The rain falls harder.

For the first time, the clock trembles between 23:59 and 00:00.

A familiar voice speaks from the darkness:

“Will you run again?”`,
    choices: [
      {
        text: "No. I accept the truth.",
        next: "ENDING_TRUE_RELEASE",
        effect: { awareness: 1 }
      },
      {
        text: "I should have saved you.",
        next: "ENDING_FORGIVENESS",
        effect: { awareness: 1, curiosity: 1 }
      },
      {
        text: "Turn around and run",
        next: "ENDING_ENDLESS_LOOP",
        effect: { fear: 1 }
      },
      {
        text: "Walk toward the older version of yourself",
        next: "ENDING_BECOME_THE_MAN",
        effect: { bravery: 1 }
      }
    ]
  },

  LOOP_1: {
    text: `Everything goes black.

A ringing sound fills your ears.

You open your eyes again.

Your phone screen glows in the dark.

23:59

You feel that this has happened before.`,
    choices: [
      {
        text: "Begin again",
        next: "S1",
        effect: {},
        loop: true
      }
    ]
  },

  LOOP_2: {
    text: `The room fractures like broken glass.

For one second, you see rain, headlights, and blood.

Then—

You wake up again.

23:59`,
    choices: [
      {
        text: "Start the loop again",
        next: "S1",
        effect: {},
        loop: true
      }
    ]
  },

  LOOP_3: {
    text: `Darkness swallows the scene.

This time, the reset hurts.

You are back in your room.

23:59

But now you know:
something is waiting for your answer.`,
    choices: [
      {
        text: "Try again",
        next: "S1",
        effect: {},
        loop: true
      }
    ]
  },

  LOOP_4: {
    text: `The world folds inward.

A whisper reaches you before everything resets:

“You know what happened now.
And you are still running.”

You wake up.

23:59`,
    choices: [
      {
        text: "Face the night again",
        next: "S1",
        effect: {},
        loop: true
      }
    ]
  },

  ENDING_TRUE_RELEASE: {
    ending: true,
    title: "ENDING: TRUE RELEASE",
    text: `You do not run.

You do not lie.

You do not look away.

For the first time, you let the truth stay inside you.

The clock changes.

00:00

The loop breaks.

Not because you escaped the past—
but because you stopped hiding from it.`,
    sub: "The strongest ending. Acceptance breaks the cycle."
  },

  ENDING_FORGIVENESS: {
    ending: true,
    title: "ENDING: FORGIVENESS",
    text: `You whisper into the rain:

“I should have saved you.”

For a long moment, there is only silence.

Then her voice answers:

“You are late.
But you finally stopped running.”

The world softens.

When you open your eyes again, you are in a hospital room.

This time, the clock is moving.`,
    sub: "A sad but healing ending."
  },

  ENDING_ENDLESS_LOOP: {
    ending: true,
    title: "ENDING: ENDLESS LOOP",
    text: `You turn away.

Again.

Everything collapses into darkness.

When the screen of your phone lights up once more, it reads:

23:59

But this time, the wallpaper is wrong.

The face on it no longer feels fully like yours.`,
    sub: "You escaped nothing. The loop owns more of you now."
  },

  ENDING_BECOME_THE_MAN: {
    ending: true,
    title: "ENDING: BECOME THE MAN",
    text: `You step toward the older version of yourself.

He looks tired.

Relieved.

As if he has been waiting for you to take his place.

The next loop begins.

Inside the building, someone opens a curtain.

And now, on the road below, it is you who waits.`,
    sub: "The darkest twist. You do not escape the loop—you inherit it."
  },

  ENDING_DARK_GUILT: {
    ending: true,
    title: "ENDING: DARK GUILT",
    text: `You remember everything.

And instead of accepting it, you drown in it.

The loop does not reset.

It deepens.

Now there is no room, no apartment, no phone.

Only endless rain, twisted metal, and the moment you failed—repeating forever.`,
    sub: "You remembered the truth, but could not survive it."
  }
};

const storyText = document.getElementById("storyText");
const choicesContainer = document.getElementById("choices");
const sceneId = document.getElementById("sceneId");
const braveryEl = document.getElementById("bravery");
const fearEl = document.getElementById("fear");
const curiosityEl = document.getElementById("curiosity");
const awarenessEl = document.getElementById("awareness");
const loopCountEl = document.getElementById("loopCount");
const restartBtn = document.getElementById("restartBtn");

function updateStats() {
  braveryEl.textContent = state.bravery;
  fearEl.textContent = state.fear;
  curiosityEl.textContent = state.curiosity;
  awarenessEl.textContent = state.awareness;
  loopCountEl.textContent = state.loopCount;
}

function applyEffect(effect = {}) {
  state.bravery += effect.bravery || 0;
  state.fear += effect.fear || 0;
  state.curiosity += effect.curiosity || 0;
  state.awareness += effect.awareness || 0;
}

function renderScene(sceneKey) {
  state.currentScene = sceneKey;
  const scene = scenes[sceneKey];

  sceneId.textContent = `SCENE: ${sceneKey}`;
  choicesContainer.innerHTML = "";

  if (scene.ending) {
    storyText.innerHTML = `
      <div class="ending-title">${scene.title}</div>
      ${scene.text}
      <div class="ending-sub">${scene.sub}</div>
    `;
  } else {
    storyText.textContent = scene.text;
  }

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      applyEffect(choice.effect);

      if (choice.loop) {
        state.loopCount += 1;
      }

      updateStats();
      renderScene(choice.next);
    });

    choicesContainer.appendChild(button);
  });

  updateStats();
}

function restartStory() {
  state.bravery = 0;
  state.fear = 0;
  state.curiosity = 0;
  state.awareness = 0;
  state.loopCount = 0;
  state.currentScene = "S1";
  renderScene("S1");
}

restartBtn.addEventListener("click", restartStory);

renderScene("S1");