import React, { useState } from 'react';
import axios from 'axios';
import { enc, HmacSHA256, SHA256, encBase64 } from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';


const MomoPayment = () => {
  const [accessKey] = useState('F8BBA842ECF85');
  const [secretKey] = useState('K951B6PE1waDMi640xX08PD3vg6EkVlz');
  const [orderInfo] = useState('pay with MoMo');
  const [partnerCode] = useState('MOMO');
  const [redirectUrl] = useState('https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b');
  const [ipnUrl] = useState('https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b');
  const [amount] = useState('50000');
  const [orderId] = useState(partnerCode + new Date().getTime());
  const [requestId] = useState(orderId);
  const [extraData] = useState('');
  const [paymentCode] = useState('T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==');
  const [orderGroupId] = useState('');
  const [autoCapture] = useState(true);
  const [lang] = useState('vi');

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&paymentCode=${paymentCode}&requestId=${requestId}`;

  const createSignature = (rawSignature, secretKey) => {
    return HmacSHA256(rawSignature, secretKey).toString(enc.Hex);
  };

  const sendMomoRequest = () => {
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      autoCapture: autoCapture,
      extraData: extraData,
      paymentCode: paymentCode,
      orderGroupId: orderGroupId,
      signature: createSignature(rawSignature, secretKey),
    });

    const options = {
        hostname: 'test-payment.momo.vn',
        port: 443,
        path: '/v2/gateway/api/pos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': requestBody.length,
        },
        data: requestBody,
    };

    axios(options)
      .then((response) => {
        console.log('Response:', response.data);
        
      })
      .catch((error) => {
        console.error('Lỗi trong quá trình gửi yêu cầu:', error);
      });
  };

  return (
    <div>
      <button onClick={sendMomoRequest}>Pay with MoMo</button>
    </div>
  );
};

export default MomoPayment