import { Tab } from 'semantic-ui-react';
import styled from 'styled-components';
import { StyledForm } from './StyledForm';

export const StyledTabPane = styled(Tab.Pane)`
  flex: 1 1 auto;
  display: flex !important;
  flex-direction: column;
  flex-wrap: nowrap;
  
  & > ${StyledForm} {
    flex: 1 0 auto;
  }
`

export const StyledTabContainer = styled('div')`
  flex: 1 1 auto;
  display: flex !important;
  flex-direction: column;
  flex-wrap: nowrap;
  
  & > .menu {
    flex: 0 0 auto;
  }
`
