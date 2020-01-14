import React, {useCallback, useEffect, useState} from 'react';
import {Empty, Form, Icon, Input, message, Popover} from "antd";
import {toV1Link, toV2Link} from "../index";
import QRCode from 'qrcode.react';
import copy from 'clipboard-copy';

interface Props {
}

interface PopoverQRCodeProps {
  data: string;
}

const PopoverQRCode: React.FC<PopoverQRCodeProps> = (props) => {
  const handleCopy = useCallback(() => {
    copy(props.data).then(() => {
      message.success('已复制到剪切板');
    });
  }, [props.data]);
  return (
    <span>
      <Popover
        placement={'right'}
        content={props.data ? (<QRCode value={props.data} />) : (<Empty />)}
      >
      {props.children}&emsp;{props.data && <a><Icon type={'qrcode'} /></a>}
      </Popover>
      {props.data && (<a>&emsp;<Icon onClick={handleCopy} type={'copy'} /></a>)}
    </span>
  );
};

const Tools: React.FC<Props> = () => {
  const [link, setLink] = useState('');
  const [linkV1, setLinkV1] = useState('');
  const [linkV2, setLinkV2] = useState('');
  useEffect(() => {
    setLinkV1(toV1Link(link));
    setLinkV2(toV2Link(link));
  }, [link]);
  return (
    <div>
      <Form layout={'vertical'}>
        <Form.Item>
          <Input.TextArea
            placeholder={'vmess://'}
            value={link}
            onChange={e => setLink(e.target.value.replace(/\n*/g, ''))}
            autosize={{
              minRows: 3,
            }}
          />
        </Form.Item>
        {
          linkV1 && (
            <Form.Item label={(<PopoverQRCode data={linkV1}>VMess V1</PopoverQRCode>)}>
              <div style={{ wordBreak: "break-word" }}>
                {linkV1}
              </div>
            </Form.Item>
          )
        }
        {
          linkV2 && (
            <Form.Item label={(<PopoverQRCode data={linkV2}>VMess V2</PopoverQRCode>)}>
              <div style={{ wordBreak: "break-word" }}>
                {linkV2}
              </div>
            </Form.Item>
          )
        }
      </Form>
    </div>
  );
};

export default Tools;
