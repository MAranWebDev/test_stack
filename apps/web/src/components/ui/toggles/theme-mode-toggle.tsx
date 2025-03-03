import { THEME_MODES, THEME_MODE_VALUES } from '@/libs/mui/constants';
import { useThemeModeStore } from '@/libs/zustand/stores';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MouseEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

export const ThemeModeToggle = () => {
  // "zustand"
  const { themeMode, changeThemeMode } = useThemeModeStore(
    useShallow((state) => ({
      themeMode: state.themeMode,
      changeThemeMode: state.changeThemeMode,
    })),
  );

  // "react-i18next"
  const { t } = useTranslation();

  const toggleValues = useMemo(
    () => [
      {
        Icon: LightModeIcon,
        value: THEME_MODES.LIGHT,
        text: t('themeModes.light'),
      },
      {
        Icon: SettingsBrightnessOutlinedIcon,
        value: THEME_MODES.SYSTEM,
        text: t('themeModes.system'),
      },
      {
        Icon: DarkModeOutlinedIcon,
        value: THEME_MODES.DARK,
        text: t('themeModes.dark'),
      },
    ],
    [t],
  );

  // Utils
  const handleChange = (
    _: MouseEvent<HTMLElement>,
    newThemeMode: THEME_MODES,
  ) => {
    if (THEME_MODE_VALUES.includes(newThemeMode)) changeThemeMode(newThemeMode);
  };

  return (
    <ToggleButtonGroup
      fullWidth
      exclusive
      size="medium"
      value={themeMode}
      onChange={handleChange}
    >
      {toggleValues.map(({ value, text, Icon }) => (
        <ToggleButton key={value} value={value}>
          <Icon sx={{ mr: 1 }} />
          {text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
