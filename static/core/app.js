// Направление зависит от учреждения: показываем только направления выбранного учреждения
document.querySelectorAll('select[data-inst-select]').forEach(inst => {
  const dir = document.querySelector(inst.dataset.instSelect);
  const sync = () => {
    let keep = false;
    dir.querySelectorAll('option[data-inst]').forEach(o => {
      o.hidden = o.disabled = o.dataset.inst !== inst.value;
      if (o.selected && !o.hidden) keep = true;
    });
    if (!keep) dir.value = '';
    dir.disabled = !inst.value;
  };
  inst.addEventListener('change', sync);
  sync();
});

// «Трудоустроен: да» открывает поля компании и должности
document.querySelectorAll('[data-show-if]').forEach(block => {
  const [name, value] = block.dataset.showIf.split('=');
  const inputs = document.querySelectorAll(`input[name="${name}"]`);
  const sync = () => {
    const on = [...inputs].some(i => i.checked && i.value === value);
    block.hidden = !on;
  };
  inputs.forEach(i => i.addEventListener('change', sync));
  sync();
});

// Подтверждение опасных действий
document.addEventListener('submit', e => {
  const msg = e.target.dataset.confirm;
  if (msg && !confirm(msg)) e.preventDefault();
});

// Скопировать текст (список ненайденных)
document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
  const text = document.querySelector(btn.dataset.copy).value;
  try { await navigator.clipboard.writeText(text); } catch (_) {
    const t = document.querySelector(btn.dataset.copy); t.hidden = false; t.select(); document.execCommand('copy'); t.hidden = true;
  }
  const old = btn.textContent; btn.textContent = btn.dataset.done || '✓'; setTimeout(() => btn.textContent = old, 1800);
}));

// Отправка формы фильтров при смене select
document.querySelectorAll('form[data-autosubmit] select').forEach(s => s.addEventListener('change', () => s.form.requestSubmit()));
