export function checkPasswordStrength(password = '') {
  if (!password) {
    return {
      score: 0,
      label: 'Weak',
      color: 'bg-slate-700 text-slate-400',
      barColor: 'bg-slate-700',
      percent: 0,
      hasLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false
    };
  }

  const hasLength = password.length >= 8;
  const hasMinLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score += 1;
  if (hasLength) score += 1;
  if (hasUpper && hasLower) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecial) score += 1;

  let label = 'Weak';
  let color = 'bg-red-500/20 text-red-400 border-red-500/30';
  let barColor = 'bg-red-500';
  let percent = 25;

  if (score >= 4) {
    label = 'Strong';
    color = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    barColor = 'bg-emerald-500';
    percent = 100;
  } else if (score >= 2) {
    label = 'Medium';
    color = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    barColor = 'bg-amber-500';
    percent = 60;
  }

  return {
    score,
    label,
    color,
    barColor,
    percent,
    hasLength: hasMinLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial
  };
}
