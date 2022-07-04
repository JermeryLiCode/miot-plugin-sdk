import { useState, useEffect } from 'react';
import { Service, Device } from 'miot';
import { getModelType } from './useModelType';
const cacheShowMemberSet = {};
// 请求是否展示「按键设置」的状态
export function showMemberSet(model = Device.model) {
  if (cacheShowMemberSet[model] !== undefined) {
    return Promise.resolve(cacheShowMemberSet[model]);
  }
  return new Promise((resolve, reject) => {
    getModelType().then((modelTypeInfo) => {
      if (!['switch', 'control-panel', 'relay', 'controller'].includes(modelTypeInfo)) {
        cacheShowMemberSet[model] = false;
        return resolve(cacheShowMemberSet[model]);
      }
      Service.callSmartHomeAPI("/v2/device/multi_button_template", { model: model }).then((res) => {
        const member = res.members ?? [];
        if (member.length >= 2 && member.length <= 6) {
          cacheShowMemberSet[model] = true;
        } else {
          cacheShowMemberSet[model] = false;
        }
        resolve(cacheShowMemberSet[model]);
      }).catch((error) => {
        cacheShowMemberSet[model] = false;
        Service.smarthome.reportLog(Device.model, `Service.smarthome.multi_button_template error: ${ JSON.stringify(error) }`);
        reject(error);
      });
    });
  });
}
export default function useMemberSetInfo(model = Device.model) {
  const [showMemberSetKey, setMemberInfo] = useState(cacheShowMemberSet[model] || false);
  useEffect(() => {
    showMemberSet(model).then((memberInfo) => {
      setMemberInfo(memberInfo || false);
    }).catch(() => { });
  }, [model]);
  return showMemberSetKey;
}