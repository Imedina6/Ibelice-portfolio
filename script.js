const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

function selectTab(tab, updateHash = true) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.setAttribute('tabindex', active ? '0' : '-1');
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tab.dataset.tab;
  });

  if (updateHash) history.replaceState(null, '', `#${tab.dataset.tab}`);
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    selectTab(tabs[next]);
  });
});

const requestedTab = location.hash.slice(1);
const matchingTab = tabs.find((tab) => tab.dataset.tab === requestedTab);
if (matchingTab) selectTab(matchingTab, false);

document.querySelector('#year').textContent = new Date().getFullYear();
