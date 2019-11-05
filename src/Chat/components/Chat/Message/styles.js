import styled from 'styled-components'

export const ContainerMessage = styled.div`
  clear: both;
  position: relative;

 .warningMessage{
    text-align: center;
    font-weight: bold;
    font-size: 13px;
    color: #888;
    width: fit-content;
    background: #dcdcdc;
    border-bottom: 1px solid #bbb;
    display: block;
    padding: 5px;
    border-radius: 5px;
    margin: 0 auto;
  } 

  .content-message{
    width: fit-content;
    min-width:40px;
    max-width: ${props => props.isImg ? '40%' : '60%'};
    background: ${props => props.isIdUserLogged ? 'beige' : '#f8f8f8'};
    margin-bottom: 5px;
    border-radius: 6px;
    padding: 5px 8px;
    z-index: 2;
    float: ${props => props.isIdUserLogged ? 'right' : 'left'};
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px #aaa;
    position: ${props => props.preview ? 'static' : 'relative'};
    p{
      font-size: 14px;
      color: #333;
    }
    &::after{
      content: '';
      position: absolute;
      border-width: 10px;
      border-color: beige transparent transparent transparent;
      border-style: solid;
      top:0;
      right: -10px;
      ${props => !props.isIdUserLogged && `
        left: -10px;
        right: inherit;
        border-color: #f8f8f8 transparent transparent transparent;
      `}
    }

    .content-img{
      width: 100%;
      overflow: hidden;
      max-width: 100%;
      max-height: 250px;
      cursor: pointer;
    }
    .content-img img{
      width: 160px;
      margin: 0 auto;
      text-align: center;
      display: block;
      transition: transform 300ms ease-in-out;
    }
    div{
      .hour{
        position: relative;
        width: 30px;
        font-weight: 400;
        color: #777;
        float: right;
        font-size: 11px;
        right: -4px;
        margin-top: 3px;
      }
    }
  }
  
`