const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo Config Plugin to automatically copy custom sounds into android/app/src/main/res/raw/
 * during EAS Build / expo prebuild.
 */
const withCustomNotificationSounds = (config, sounds = []) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const resRawDir = path.join(
        projectRoot,
        'android',
        'app',
        'src',
        'main',
        'res',
        'raw'
      );

      // Ensure res/raw exists on Android
      if (!fs.existsSync(resRawDir)) {
        fs.mkdirSync(resRawDir, { recursive: true });
      }

      for (const soundPath of sounds) {
        const srcFile = path.resolve(projectRoot, soundPath);
        if (fs.existsSync(srcFile)) {
          const fileName = path.basename(srcFile);
          const destFile = path.join(resRawDir, fileName);
          fs.copyFileSync(srcFile, destFile);
          console.log(`[Plugin:CustomSounds] Copied ${fileName} -> android/app/src/main/res/raw/`);
        } else {
          console.warn(`[Plugin:CustomSounds] Sound file not found: ${srcFile}`);
        }
      }

      return config;
    },
  ]);
};

module.exports = withCustomNotificationSounds;

