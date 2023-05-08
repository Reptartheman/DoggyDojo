// TODO: Should we be storing this data somewhere else, like in our database?

const questions = [
  {
    text: 'What size is your dog?',
    options: [
      { id: 0, text: 'Small' },
      { id: 1, text: 'Medium' },
      { id: 2, text: 'Large' },
    ],
  },
  {
    text: 'How active is your dog?',
    options: [
      { id: 0, text: 'Couch potato' },
      { id: 1, text: 'Loves a long walk' },
      { id: 2, text: 'Bouncing off the walls' },
    ],
  },
  {
    text: 'What kind of training are you looking for?',
    options: [
      { id: 0, text: 'Agility' },
      { id: 1, text: 'Obedience' },
      { id: 2, text: 'Show' },
    ],
  },
];

export default questions;
