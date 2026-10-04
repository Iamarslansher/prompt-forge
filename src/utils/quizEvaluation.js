export function evaluateTextAnswer(question, answer) {
  const normalizedAnswer = String(answer || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const concepts = question.rubric || [];
  const matchesConcept = (concept) => concept.split('|').some((term) => {
    const escapedTerm = term.trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pluralForm = escapedTerm.endsWith('s') ? escapedTerm.slice(0, -1) : `${escapedTerm}s`;
    return new RegExp(`\\b(?:${escapedTerm}|${pluralForm})\\b`).test(normalizedAnswer);
  });
  const matchedConcepts = concepts.filter(matchesConcept);
  const missingConcepts = concepts.filter((concept) => !matchesConcept(concept));
  const ratio = concepts.length ? matchedConcepts.length / concepts.length : 0;
  const score = ratio >= 0.75 ? 1 : ratio >= 0.4 ? 0.5 : 0;

  return {
    score,
    matchedCount: matchedConcepts.length,
    totalConcepts: concepts.length,
    missingConcepts,
    feedback: score === 1
      ? 'Strong response: it covers the main requirements.'
      : score === 0.5
        ? 'Partially correct: add the missing requirements listed below.'
        : 'Needs improvement: address more of the task requirements listed below.'
  };
}
