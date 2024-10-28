import { RadioGroupItem, RadioGroup, Label } from '@/components/ui';

export const ModeToggle = () => {
  const isDark = document.documentElement.classList.contains('dark');

  const toggleTheme = (theme: string) => {
    console.log(theme)
    document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
  };

  return (
    <RadioGroup defaultValue={isDark ? 'dark' : 'light'}>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem onClick={() => toggleTheme('light')} value='light' id='r1' />
        <Label htmlFor='r1'>Light</Label>
      </div>
      <div className='flex items-center space-x-2'>
        <RadioGroupItem onClick={() => toggleTheme('dark')} value='dark' id='r2' />
        <Label htmlFor='r2'>Dark</Label>
      </div>
    </RadioGroup>
  );
};
