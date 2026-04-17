import {buildLegacyTheme} from 'sanity'

export const theme = buildLegacyTheme({
  '--black': '#282828',
  '--white': '#FEFFF7',
  '--gray': '#8E8E8E',
  '--gray-base': '#666666',
  '--component-bg': '#FEFFF7',
  '--component-text-color': '#282828',

  // Brand
  '--brand-primary': '#178CE5',

  // Buttons
  '--default-button-color': '#282828',
  '--default-button-primary-color': '#178CE5',
  '--default-button-success-color': '#43D675',
  '--default-button-warning-color': '#FFC107',
  '--default-button-danger-color': '#E53935',

  // State
  '--state-info-color': '#178CE5',
  '--state-success-color': '#43D675',
  '--state-warning-color': '#FFC107',
  '--state-danger-color': '#E53935',

  // Navigation
  '--main-navigation-color': '#282828',
  '--main-navigation-color--inverted': '#FEFFF7',

  // Focus
  '--focus-color': '#178CE5',
})
