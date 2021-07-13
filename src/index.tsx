import * as React from 'react';
import * as ReactDom from 'react-dom';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';

interface MyName{
  name: string
  height: string
}

//基本的には関数コンポーネントで書くといいらしい
const Hello: React.FC<MyName> = ({name, height}) => { //name, height といったpropsには初期値あるいは不変の値を記述

  //状態を動的に変化させたいもの = state は、関数コンポーネント内ではこんな感じで定義する
  const [inputs, setInputs] = React.useState<string[]>([]); //setStateで怒られないためにジェネリックなuseStateを使う必要がありそう

  function appendInput(){ //ボタンを押した時に呼び出す関数。やってることはただinputsというstringのリストに1要素追加しているだけ
    const newInput = `input-${inputs.length + 1}`;
    setInputs(inputs.concat([newInput]));
  }
  function removeInput(){
    inputs.pop();
    setInputs(inputs.concat([])); //inputsをそのまま入れると再描画されない（同じ参照先だから？）
  }
  
    return (
      <Box height={height}>
        Hello, {name}!<br/>
        {inputs.map(input => <TextField key={input} style={{width: "20%"}}/>)}
        <Button onClick={() => appendInput() }>
          APPEND BUTTON
        </Button>
        <Button onClick={() => removeInput() }>
          REMOVE BUTTON
        </Button>
      </Box>
    );
}

ReactDom.render(
  <Hello name="React" height="100vh"/>,
  document.getElementById('root')
);