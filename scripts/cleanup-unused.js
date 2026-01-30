#!/usr/bin/env node
/**
 * Safe cleanup of unused files (see UNUSED_ANALYSIS_REPORT.md).
 *
 * Usage:
 *   node scripts/cleanup-unused.js --dry-run        # List only, no delete
 *   node scripts/cleanup-unused.js --safe          # Delete safe set only (3 files)
 *   node scripts/cleanup-unused.js --all           # Delete all reported unused
 *
 * Safe set: useInactivityLogout.ts, PromoBanners.tsx, ProtectedRoute.tsx
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SAFE_UNUSED = [
  'src/app/hooks/useInactivityLogout.ts',
  'src/app/components/home/PromoBanners.tsx',
  'src/app/components/ProtectedRoute.tsx',
];

const OPTIONAL_UNUSED = [
  'src/app/utils/apiSessionExample.ts',
];

const UI_UNUSED = [
  'src/app/components/ui/alert-dialog.tsx',
  'src/app/components/ui/alert.tsx',
  'src/app/components/ui/aspect-ratio.tsx',
  'src/app/components/ui/avatar.tsx',
  'src/app/components/ui/breadcrumb.tsx',
  'src/app/components/ui/calendar.tsx',
  'src/app/components/ui/card.tsx',
  'src/app/components/ui/carousel.tsx',
  'src/app/components/ui/chart.tsx',
  'src/app/components/ui/checkbox.tsx',
  'src/app/components/ui/collapsible.tsx',
  'src/app/components/ui/command.tsx',
  'src/app/components/ui/context-menu.tsx',
  'src/app/components/ui/drawer.tsx',
  'src/app/components/ui/form.tsx',
  'src/app/components/ui/hover-card.tsx',
  'src/app/components/ui/input-otp.tsx',
  'src/app/components/ui/menubar.tsx',
  'src/app/components/ui/navigation-menu.tsx',
  'src/app/components/ui/pagination.tsx',
  'src/app/components/ui/popover.tsx',
  'src/app/components/ui/progress.tsx',
  'src/app/components/ui/radio-group.tsx',
  'src/app/components/ui/resizable.tsx',
  'src/app/components/ui/scroll-area.tsx',
  'src/app/components/ui/separator.tsx',
  'src/app/components/ui/sidebar.tsx',
  'src/app/components/ui/skeleton.tsx',
  'src/app/components/ui/slider.tsx',
  'src/app/components/ui/sonner.tsx',
  'src/app/components/ui/switch.tsx',
  'src/app/components/ui/table.tsx',
  'src/app/components/ui/tabs.tsx',
  'src/app/components/ui/textarea.tsx',
  'src/app/components/ui/toggle-group.tsx',
  'src/app/components/ui/toggle.tsx',
  'src/app/components/ui/tooltip.tsx',
  'src/app/components/ui/use-mobile.ts',
];

const IMPORTS_UNUSED = [
  'src/imports/CategoryNav-372-3240.tsx',
  'src/imports/Container.tsx',
  'src/imports/Group1-56-145.tsx',
  'src/imports/Group1-59-128.tsx',
  'src/imports/Group1.tsx',
  'src/imports/Group2.tsx',
  'src/imports/Group3-165-25.tsx',
  'src/imports/Group3-72-165.tsx',
  'src/imports/Group3.tsx',
  'src/imports/Group4.tsx',
  'src/imports/Group45.tsx',
  'src/imports/Group5.tsx',
  'src/imports/Mn.tsx',
  'src/imports/MobileBottomNavBeforeLogin.tsx',
  'src/imports/PrimitiveDiv.tsx',
  'src/imports/RiocityHome.tsx',
  'src/imports/RiocityNewTemplate.tsx',
  'src/imports/RiocityReferral.tsx',
  'src/imports/RiocitySettings.tsx',
  'src/imports/RiocitySlots.tsx',
  'src/imports/RiocityWithdraw.tsx',
  'src/imports/svg-2kon9sou17.ts',
  'src/imports/svg-6c3hb.tsx',
  'src/imports/svg-6tbrocfn7w.ts',
  'src/imports/svg-8asj6hswl8.ts',
  'src/imports/svg-ctto32vynd.ts',
  'src/imports/svg-g1qpaikfai.ts',
  'src/imports/svg-gppaxj8tjk.ts',
  'src/imports/svg-muri2yv1ek.ts',
  'src/imports/svg-nvbvbd9v3f.ts',
  'src/imports/svg-qk51s.tsx',
  'src/imports/svg-rb6etug06m.ts',
  'src/imports/svg-rufrx3nfe8.ts',
  'src/imports/svg-sm5w4zho5b.ts',
  'src/imports/svg-xus9hu9445.ts',
  'src/imports/svg-y9tkyxqf1f.ts',
  'src/imports/svg-ypvtr9t534.ts',
];
// NOTE: src/imports/svg-fhcj8q950g is USED - do not add to list

function resolve(p) {
  return path.join(ROOT, p);
}

function exists(p) {
  return fs.existsSync(resolve(p));
}

function remove(p) {
  const full = resolve(p);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    return true;
  }
  return false;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const safeOnly = args.includes('--safe');
  const all = args.includes('--all');

  let toDelete = [];
  if (safeOnly) {
    toDelete = [...SAFE_UNUSED];
  } else if (all) {
    toDelete = [...SAFE_UNUSED, ...OPTIONAL_UNUSED, ...UI_UNUSED, ...IMPORTS_UNUSED];
  } else {
    // default: safe only
    toDelete = [...SAFE_UNUSED];
  }

  const existing = toDelete.filter(exists);
  const missing = toDelete.filter((p) => !exists(p));

  if (dryRun) {
    console.log('DRY RUN – would delete:');
    existing.forEach((p) => console.log('  ', p));
    if (missing.length) {
      console.log('\nNot found (skip):');
      missing.forEach((p) => console.log('  ', p));
    }
    console.log('\nTotal:', existing.length, 'files');
    return;
  }

  let deleted = 0;
  existing.forEach((p) => {
    if (remove(p)) {
      console.log('Deleted:', p);
      deleted++;
    }
  });
  console.log('Done. Deleted', deleted, 'files.');
}

main();
