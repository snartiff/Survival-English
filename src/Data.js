import ManDrinkingCoffee from './images/businessmandrinkingcoffee.jpeg';
import LateMan from './images/lateman.jpg';
import WomanWriting from './images/womanwritingatdesk.jpeg';
import HungryBusinesswoman from './images/HungryBusinesswoman.jpg';

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

  let possibleAnswers = ["was", "were", "is", "are"];
  let levelOnePrompts = [];

  p1.image = HungryBusinesswoman;
  p1.sentence = "Anne __ eating her lunch.";
  p1.pastTenseAnswer = "was";
  p1.presentTenseAnswer = "is"
  p1.possibleAnswers = possibleAnswers;
  p2.image = HungryBusinesswoman;
  p2.sentence = "The people ___ taking the train.";
  p2.pastTenseAnswer= "were";
  p2.presentTenseAnswer = "are"
  p2.possibleAnswers = possibleAnswers;
  p3.image = HungryBusinesswoman;
  p3.sentence = "Jose __ going to send an email.";
  p3.pastTenseAnswer = "was";
  p3.presentTenseAnswer = "is"
  p3.possibleAnswers = possibleAnswers;
  p4.image = HungryBusinesswoman;
  p4.sentence = "The woman __ drinking coffee.";
  p4.pastTenseAnswer = "was";
  p4.presentTenseAnswer = "is"
  p4.possibleAnswers = possibleAnswers;
  p5.image = HungryBusinesswoman;
  p5.sentence = "The men __ eating breakfast.";
  p5.pastTenseAnswer = "were";
  p5.presentTenseAnswer = "are"
  p5.possibleAnswers = possibleAnswers;
  p6.image = HungryBusinesswoman;
  p6.sentence = "They __ walking.";
  p6.pastTenseAnswer = "were";
  p6.presentTenseAnswer = "are"
  p6.possibleAnswers = possibleAnswers;
  p7.image = HungryBusinesswoman;
  p7.sentence = "The women __ leaving.";
  p7.pastTenseAnswer = "were";
  p7.presentTenseAnswer = "are"
  p7.possibleAnswers = possibleAnswers;
  p8.image = HungryBusinesswoman;
  p8.sentence = "She __ talking.";
  p8.pastTenseAnswer = "was";
  p8.presentTenseAnswer = "is"
  p8.possibleAnswers = possibleAnswers;
  p9.image = HungryBusinesswoman;
  p9.sentence = "He __ sleeping.";
  p9.pastTenseAnswer = "was";
  p9.presentTenseAnswer = "is"
  p9.possibleAnswers = possibleAnswers;
  p10.image = HungryBusinesswoman;
  p10.sentence = "It __ broken.";
  p10.pastTenseAnswer = "was";
  p10.presentTenseAnswer = "is"
  p10.possibleAnswers = possibleAnswers;


  levelOnePrompts.push( p1, p2, p3, p4, p5, p6, p7, p8, p9, p10 )

  return levelOnePrompts
}
