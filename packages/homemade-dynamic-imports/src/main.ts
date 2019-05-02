async function bootstrap() {
  document.write('<div id="app">Hello Dynamic imports!</div>');
  let { origin } = await import('./in-bundle.json');
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('LOL');
  }

  const bundleOrigin = document.createElement('div');
  bundleOrigin.innerText = `Hello json from ${origin}`
  root.appendChild(bundleOrigin);

  ({ origin } = await import('./static.json'));
  const staticOrigin = document.createElement('div');
  staticOrigin.innerText = `Hello json from ${origin}`
  root.appendChild(staticOrigin);
}

bootstrap();
