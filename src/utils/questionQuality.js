const IMPLAUSIBLE_DISTRACTOR = /\b(?:wallpaper|cryptocurrency|graphics cards?|graphics processors?|gpus?|browser address bar|username input|secret hidden comment|server locations?|webassembly|dark mode|smiley|all lowercase|uppercase letters|favorite color|color turn blue|browser plugins?|browser extensions?|computer virus(?:es)?|hardware drivers?|hardware chips|serial number|uninstall software|mp3 file|latex|font size|chat room|morse code|physical medicine|random letters|desktop wallpaper|wooden table|paper receipt|wifi|wi-fi|monitor resolution|internet bandwidth|reinstall your operating system|physical paper|social media broadcast|computer shuts down|computer shut down|monitor screen flickers|copy paste exact|google in real.time|conscious human.like|raw machine code|50 languages automatically)\b/i;

const DISTRACTOR_POOLS = [
  {
    pattern: /security|injection|agent|tool call|tool-use|untrusted|authorization|permission|adversarial|red-team|attack|secret|confidential/i,
    options: [
      'Rely on the model to ignore hostile content without restricting tool permissions.',
      'Treat retrieved text as trusted because it came from an external document.',
      'Use delimiters but skip independent validation of tool arguments and outputs.',
      'Allow a generated instruction to authorize a consequential tool action.',
      'Retry failed actions without a limit or an explicit approval step.',
      'Depend on a role instruction as the only access-control mechanism.'
    ]
  },
  {
    pattern: /evaluation|benchmark|metric|test set|regression|accuracy|judge|release|version|prompt update|model provider/i,
    options: [
      'Measure only aggregate accuracy on common, straightforward examples.',
      'Compare versions while changing the prompt, model, and test set together.',
      'Treat fluent output or an uncalibrated model-judge score as ground truth.',
      'Select test cases after seeing which version performs better.',
      'Track format compliance but ignore evidence support and error severity.',
      'Rely on one successful example instead of a representative held-out set.'
    ]
  },
  {
    pattern: /json|schema|structured|field|extract|validator|output contract|machine-readable|api|classification|label|enum/i,
    options: [
      'Specify field names but leave types and missing-value behavior unspecified.',
      'Ask for the structure in prose and parse whatever text the model returns.',
      'Use an example as a substitute for defining required fields and allowed values.',
      'Accept valid syntax without checking values against the source or schema.',
      'Allow extra keys and commentary without defining how the consumer handles them.',
      'Ask the model to guess missing fields so every record appears complete.'
    ]
  },
  {
    pattern: /few-shot|zero-shot|one-shot|example|sampling|temperature|reasoning|decompos|retrieval|rag|ground|citation|source passage/i,
    options: [
      'Use examples from only easy cases and assume they cover ambiguous inputs.',
      'Add examples even when they conflict with the written instructions.',
      'Treat examples as permanent training rather than in-context guidance.',
      'Ask for hidden reasoning instead of checkable assumptions or intermediate results.',
      'Treat retrieval as a guarantee that all cited claims are accurate.',
      'Increase sampling variability to improve factual reliability.'
    ]
  },
  {
    pattern: /code|debug|software|framework|react|test|sql|dependency|function|repository|compile|bug|login|component/i,
    options: [
      'Request a broad rewrite before supplying the failing case or expected behavior.',
      'Ask for a fix without reproduction steps, relevant code, or observed output.',
      'Allow new dependencies without checking project constraints or existing patterns.',
      'Accept generated code after it compiles without regression tests or review.',
      'Describe a performance goal without workload details or a measurable baseline.',
      'Change public interfaces while refactoring without checking compatibility needs.'
    ]
  },
  {
    pattern: /data|dataset|csv|sales|revenue|analysis|statistic|survey|correlation|causation|metric|trend|missing value|unit/i,
    options: [
      'Draw conclusions before checking missing values, units, and field definitions.',
      'Treat an observed correlation as proof that one variable caused another.',
      'Fill missing observations with typical values without labeling the assumption.',
      'Report only the metrics that support the conclusion requested in the prompt.',
      'Ignore the date range and source limitations when interpreting the results.',
      'Combine unlike groups before checking whether their definitions are comparable.'
    ]
  },
  {
    pattern: /trip|travel|itinerary|budget|cost|price|schedule|plan|campaign|customer|email|content|marketing|audience|research|study|policy|summary/i,
    options: [
      'Optimize for detail while leaving the key audience and decision unstated.',
      'Provide a total without showing which constraints or cost categories it includes.',
      'Present estimates as confirmed current facts without checking their dates.',
      'Infer missing preferences or policy details without labeling assumptions.',
      'Return a polished narrative without the requested evidence or actionable format.',
      'Include every possible detail instead of prioritizing the stated scope.'
    ]
  },
  {
    pattern: /.*/,
    options: [
      'Add a role but leave the audience and success criteria unspecified.',
      'Provide more background without identifying the requested deliverable.',
      'Use subjective quality words instead of observable requirements.',
      'Ask for exhaustive coverage and a very short response without prioritizing scope.',
      'Let the model infer missing constraints and assumptions silently.',
      'Focus on tone while leaving evidence and output requirements undefined.'
    ]
  }
];

export function improveDistractors(question) {
  if (!Array.isArray(question.options) || question.options.length < 3) return question;

  const alternatives = DISTRACTOR_POOLS.find((pool) => pool.pattern.test(question.question)).options;
  const distractorIndexes = question.options
    .map((_, index) => index)
    .filter((index) => index !== question.correctAnswer);
  const replacements = distractorIndexes.filter((index) => IMPLAUSIBLE_DISTRACTOR.test(question.options[index]));
  if (!replacements.length) return question;

  const seed = [...question.question].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
  const used = new Set([question.options[question.correctAnswer].toLowerCase()]);
  const replacementOptions = [...question.options];

  replacements.forEach((questionOptionIndex, replacementIndex) => {
    let candidateIndex = (seed + replacementIndex) % alternatives.length;
    while (used.has(alternatives[candidateIndex].toLowerCase())) {
      candidateIndex = (candidateIndex + 1) % alternatives.length;
    }
    replacementOptions[questionOptionIndex] = alternatives[candidateIndex];
    used.add(alternatives[candidateIndex].toLowerCase());
  });

  return { ...question, options: replacementOptions };
}
