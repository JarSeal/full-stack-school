import styled from 'styled-components';

export const ToggleWrapper = styled.div`
  position: relative;
  max-width: 960px;
  min-height: 46px;
  & .toggle-area {
    transition-property: max-height;
    transition-timing-function: ease-in-out;
  }
  & .toggle-area.visi-false {
    max-height: 0;
    overflow: hidden;
    display: none;
  }
  /* Opening */
  & .toggle-area.visi-false.phase-1 {
    display: block;
  }
  & .toggle-area.visi-false.phase-2 {
    display: block;
    max-height: 250px;
  }
  & .toggle-area.visi-false.phase-3 {
    display: block;
    max-height: 250px;
  }

  /* Closing */
  & .toggle-area.visi-true.phase-1 {
    max-height: 250px;
    overflow: hidden;
  }
  & .toggle-area.visi-true.phase-2 {
    max-height: 0;
    overflow: hidden;
  }
`;