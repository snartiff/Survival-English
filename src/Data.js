import ManDrinkingCoffee from './images/businessmandrinkingcoffee.jpeg';
import LateMan from './images/lateman.jpg';
import WomanWriting from './images/womanwritingatdesk.jpeg';
import HungryBusinesswoman from './images/HungryBusinesswoman.jpg';
import PeopleTalking from './images/PeopleTalking.jpg';
import SendingEmail from './images/SendingEmail.png';
import WomanDrinkingCoffee from './images/WomanDrinkingCoffee.jpg';
import MenEatingBreakfast from './images/MenEatingBreakfast.jpg';
import PeopleWalking from './images/PeopleWalking.jpg';
import WomanLeaving from './images/WomanLeaving.png';
import WomanTalking from './images/WomanTalking.png';
import ManSleeping from './images/ManSleeping.jpg';
import BrokenComputer from './images/BrokenComputer.png';

export function getLevelTwoLessonData() {
  let p1 = {};
  let p2 = {};
  let p3 = {};
  let levelTwoPrompts = [];

  p1.image = WomanWriting;
  p1.sentence = "Elizabeth __ at her desk writing.";
  p1.presentTenseAnswer = "is";
  p1.pastTenseAnswer = "was";
  p2.image = LateMan;
  p2.sentence = "Gary __ late to the meeting.";
  p2.presentTenseAnswer= "is";
  p2.pastTenseAnswer = "Gary was late to the meeting.";
  p3.image = ManDrinkingCoffee;
  p3.sentence = "Jeremy __ drinking a cup of coffee.";
  p3.presentTenseAnswer = "is";
  p3.pastTenseAnswer = "was";
  levelTwoPrompts.push( p1, p2, p3 );

  return levelTwoPrompts
}

export function getLevelOneLessonData() {
  let p1 = {};
  let p2 = {};
  let p3 = {};
  let p4 = {};
  let p5 = {};
  let p6 = {};
  let p7 = {};
  let p8 = {};
  let p9 = {};
  let p10 = {};

  let pastTenseAnswers = ["was", "were"];
  let presentTenseAnswers = ["is", "are", "am"];
  let levelOnePrompts = [];

  p1.image = HungryBusinesswoman;
  p1.sentence = "Anne __ eating lunch.";
  p1.pastTenseAnswer = "was";
  p1.presentTenseAnswer = "is"
  p1.presentTenseAnswers = presentTenseAnswers
  p1.pastTenseAnswers = pastTenseAnswers;

  p2.image = PeopleTalking;
  p2.sentence = "The people ___ talking.";
  p2.pastTenseAnswer= "were";
  p2.presentTenseAnswer = "are"
  p2.presentTenseAnswers = presentTenseAnswers
  p2.pastTenseAnswers = pastTenseAnswers

  p3.image = SendingEmail;
  p3.sentence = "Jose __ sending an email.";
  p3.pastTenseAnswer = "was";
  p3.presentTenseAnswer = "is"

  p4.image = WomanDrinkingCoffee;
  p4.sentence = "The woman __ drinking coffee.";
  p4.pastTenseAnswer = "was";
  p4.presentTenseAnswer = "is"

  p5.image = MenEatingBreakfast;
  p5.sentence = "The men __ eating breakfast.";
  p5.pastTenseAnswer = "were";
  p5.presentTenseAnswer = "are"

  p6.image = PeopleWalking;
  p6.sentence = "They __ walking.";
  p6.pastTenseAnswer = "were";
  p6.presentTenseAnswer = "are"

  p7.image = WomanLeaving;
  p7.sentence = "The women __ leaving.";
  p7.pastTenseAnswer = "were";
  p7.presentTenseAnswer = "are"

  p8.image = WomanTalking;
  p8.sentence = "She __ talking.";
  p8.pastTenseAnswer = "was";
  p8.presentTenseAnswer = "is"

  p9.image = ManSleeping;
  p9.sentence = "He __ sleeping.";
  p9.pastTenseAnswer = "was";
  p9.presentTenseAnswer = "is"

  p10.image = BrokenComputer;
  p10.sentence = "It __ broken.";
  p10.pastTenseAnswer = "was";
  p10.presentTenseAnswer = "is"

  levelOnePrompts.push( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 )

  for (let i = 0; i < levelOnePrompts.length; i++) {
    levelOnePrompts[i].presentTenseAnswers = presentTenseAnswers;
    levelOnePrompts[i].pastTenseAnswers = pastTenseAnswers;
  }

  return levelOnePrompts
}
