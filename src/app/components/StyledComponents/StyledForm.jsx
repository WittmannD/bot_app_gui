import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

export const ToggleGroup = styled(Form.Group)`
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  margin: 0 0 1em 0 !important;

  & > label[role="button"] {
    flex: 1 1 25% !important;
  }

  & > label[role="button"]:last-child {
    margin-right: 0;
  }
`;

export const FieldGroup = styled(Form.Group)`
  margin: 0 0 1em 0 !important;

  & > .field:first-child {
    padding-left: 0 !important;
  }

  & > .field:last-child {
    padding-right: 0 !important;
  }
`;

export const KeywordsField = styled(Form.Field)`
  display: flex;

  & > * {
    margin: 0 0.5em;
  }

  & > *:first-child {
    margin-left: 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const KeywordsGroup = styled(Form.Group)`
  flex: 1 1 auto;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  margin: 0 -0.5em 1em !important;
  
  height: 0;
  min-height: 50px;
  overflow: hidden auto;

  & ${KeywordsField}:not(:last-child) {
    margin-bottom: 0.5em !important;
  }
`;

export const KeywordsPlaceholder = styled.div`
  margin: 0 1em;
  color: grey;
`

export const KeywordsButtonGroup = styled.div`
  margin-bottom: 1em;
`

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`

export const FormButtonsGroup = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  clear: both;

  & > * {
    margin: 0 0.5em;
  }

  & > *:first-child {
    margin-left: 0;
  }

  & > *:last-child {
    margin-right: 0;
  }
`

export const StyledFormCheckbox = styled(Form.Checkbox)`
  & > .checkbox {
    margin-top: 0 !important;
  }
`
