// @ts-ignore
async function bootstrap() {
  document.write('<div id="app">Hello Dynamic imports!</div>');
  const { origin } = await import('./in-bundle.json');
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('LOL');
  }

  const bundleOrigin = document.createElement('div');
  bundleOrigin.innerText = `Hello json from ${origin}`
  root.appendChild(bundleOrigin);
}

bootstrap();