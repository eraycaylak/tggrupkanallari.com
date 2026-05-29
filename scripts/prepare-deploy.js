const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const openNextDir = path.join(__dirname, '..', '.open-next');
const assetsDir = path.join(openNextDir, 'assets');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log('1. Next.js ve OpenNext build işlemi başlatılıyor...');
  execSync('npx @opennextjs/cloudflare build', { stdio: 'inherit' });
  console.log('Build tamamlandı!');

  // worker.js'i _worker.js olarak kopyala/yeniden adlandır
  const workerJsPath = path.join(openNextDir, 'worker.js');
  const _workerJsPath = path.join(openNextDir, '_worker.js');

  if (fs.existsSync(workerJsPath)) {
    console.log('2. worker.js dosyası _worker.js olarak kopyalanıyor...');
    fs.copyFileSync(workerJsPath, _workerJsPath);
  } else if (fs.existsSync(_workerJsPath)) {
    console.log('2. _worker.js zaten mevcut, kopyalamaya gerek yok.');
  } else {
    console.warn('UYARI: Ne worker.js ne de _worker.js bulundu!');
  }

  // assets klasöründeki dosyaları .open-next kök dizinine kopyala (flatten)
  if (fs.existsSync(assetsDir)) {
    console.log('3. Statik varlıklar (assets) kök dizine kopyalanıyor...');
    fs.readdirSync(assetsDir).forEach((item) => {
      const srcPath = path.join(assetsDir, item);
      const destPath = path.join(openNextDir, item);
      console.log(`- Kopyalanıyor: ${item}`);
      copyRecursiveSync(srcPath, destPath);
    });
    console.log('Statik varlıklar başarıyla kopyalandı.');
  } else {
    console.warn('UYARI: .open-next/assets klasörü bulunamadı!');
  }

  console.log('\nHazırlık tamamlandı! Artık "npx wrangler pages deploy .open-next" komutunu çalıştırabilirsiniz.');
} catch (error) {
  console.error('Hata oluştu:', error);
  process.exit(1);
}
