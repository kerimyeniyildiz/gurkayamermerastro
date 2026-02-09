import { spawn } from 'child_process';

const previewCommand =
  process.platform === 'win32'
    ? ['cmd.exe', ['/c', 'npm run preview -- --host 127.0.0.1 --port 4321']]
    : ['npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', '4321']];

const preview = spawn(previewCommand[0], previewCommand[1], { stdio: 'pipe', shell: false });

let started = false;
let stderr = '';

const waitForReady = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Preview zaman aşımı.')), 30000);

  const onData = (chunk) => {
    const text = chunk.toString();
    if (text.includes('Local') || text.includes('127.0.0.1:4321')) {
      started = true;
      clearTimeout(timeout);
      resolve(null);
    }
  };

  preview.stdout.on('data', onData);
  preview.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  preview.on('exit', (code) => {
    if (!started) {
      clearTimeout(timeout);
      reject(new Error(`Preview başlatılamadı (code ${code}). ${stderr}`));
    }
  });
});

try {
  await waitForReady;

  const auditCommand =
    process.platform === 'win32'
      ? ['cmd.exe', ['/c', 'npm run audit:lighthouse:mobile']]
      : ['npm', ['run', 'audit:lighthouse:mobile']];

  const audit = spawn(auditCommand[0], auditCommand[1], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PUBLIC_SITE_URL: 'http://127.0.0.1:4321',
    },
  });

  const auditCode = await new Promise((resolve) => {
    audit.on('exit', (code) => resolve(code ?? 1));
  });

  if (auditCode !== 0) {
    process.exitCode = auditCode;
  }
} finally {
  preview.kill('SIGTERM');
}
