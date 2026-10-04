function shuffle(items, random) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function randomizeQuizQuestions(questions, random = Math.random) {
  const positionsByOptionCount = new Map();

  questions.forEach((question, index) => {
    if (!question.options?.length) return;
    const optionCount = question.options.length;
    if (!positionsByOptionCount.has(optionCount)) {
      positionsByOptionCount.set(optionCount, []);
    }
    positionsByOptionCount.get(optionCount).push(index);
  });

  const correctPositions = new Map();
  positionsByOptionCount.forEach((questionIndexes, optionCount) => {
    const positionDeck = shuffle(
      questionIndexes.map((_, index) => index % optionCount),
      random
    );
    shuffle(questionIndexes, random).forEach((questionIndex, index) => {
      correctPositions.set(questionIndex, positionDeck[index]);
    });
  });

  return questions.map((question, questionIndex) => {
    if (!question.options?.length) return { ...question };

    const distractors = question.options.filter((_, index) => index !== question.correctAnswer);
    const shuffledDistractors = shuffle(distractors, random);
    const correctPosition = correctPositions.get(questionIndex);
    shuffledDistractors.splice(correctPosition, 0, question.options[question.correctAnswer]);

    return {
      ...question,
      options: shuffledDistractors,
      correctAnswer: correctPosition
    };
  });
}
