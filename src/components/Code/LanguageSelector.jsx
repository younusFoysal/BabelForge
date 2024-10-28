'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { LANGUAGE_VERSIONS } from './constants';
import { cn } from '@/lib/utils'; // Utility function for conditional class names

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = 'text-blue-400';

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <div className="ml-2 mb-4">
      <p className="mb-2 text-lg">Language:</p>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline">
            <span className=" capitalize">{language}</span>
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-2 bg-[#110c1b] rounded-md shadow-md w-48 overflow-hidden" sideOffset={5}>
            {languages.map(([lang, version]) => (
              <DropdownMenu.Item
                key={lang}
                onClick={() => onSelect(lang)}
                className={cn(
                  'flex items-center justify-between px-4 py-2 cursor-pointer text-sm hover:bg-gray-900 hover:text-blue-400',
                  lang === language ? 'bg-gray-900 text-blue-400' : ''
                )}
              >
                <span className=" capitalize">{lang}</span>
                <span className="text-gray-600 text-xs">({version})</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default LanguageSelector;
