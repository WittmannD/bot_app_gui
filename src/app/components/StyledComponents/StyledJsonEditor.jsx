import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 200px;
`

export const JsonEditorContainer = styled.div`
  margin: 1em 0;
  flex: 1 1 auto;
  
  & > .jsoneditor {
    border-color: #d3d3d3;
  }
`
