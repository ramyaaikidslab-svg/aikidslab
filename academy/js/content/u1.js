// Unit 1 is authored in two parts; this file joins them.
import A from './parts/u1-a.js';
import B from './parts/u1-b.js';

export default {
  id: 'u1',
  title: 'AI Reflection, Project Cycle and Ethics',
  short: 'AI Reflection',
  color: 'gold',
  syllabus: 'Unit 1 · 30 h theory + 25 h practical in the CBSE plan',
  topics: [...A, ...B]
};
