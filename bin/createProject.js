'use strict';var e=require('commander'),n=require('path'),t=require("fs"),r=require("./config/common"),o=r.project_dir,i=r.API_LEVEL,c=r.SDK_VERSION,a=(r.exec,r.execSync,r.makeDirs,r.copyFolder);function s(){console.log("\u8be6\u60c5\u94fe\u63a5\uff1a\n=========== create project command help ===========\nnpm run create xxx.xxx.xxx[\u63d2\u4ef6\u5305\u540d] -type empty :  \u521b\u5efa\u4e00\u4e2a\u7a7a\u9879\u76ee\nnpm run create xxx.xxx.xxx[\u63d2\u4ef6\u5305\u540d] -type common : \u521b\u5efa\u4e00\u4e2a\u901a\u7528\u6a21\u677f\u9879\u76ee(\u5305\u62ec: \u9875\u9762\u8df3\u8f6c\uff08NavigationBar\uff09\u3001\u8bbe\u7f6e\u9875\uff08CommonSetting\uff09\u3001\u591a\u8bed\u8a00\u3001\u9690\u79c1\u3001\u81ea\u5b9a\u4e49\u573a\u666f\u3001\u56fa\u4ef6\u5347\u7ea7)\nnpm run create xxx.xxx.xxx[\u63d2\u4ef6\u5305\u540d] -type wifi :   \u521b\u5efa\u4e00\u4e2awifi\u6a21\u677f\u9879\u76ee(\u5305\u62ec: \u901a\u7528\u6a21\u677f\u529f\u80fd\u3001\u8bbe\u5907\u63a7\u5236\u53ca\u5c5e\u6027\u8ba2\u9605\u529f\u80fd)\nnpm run create xxx.xxx.xxx[\u63d2\u4ef6\u5305\u540d] -type ble :    \u521b\u5efa\u4e00\u4e2able\u6a21\u677f\u9879\u76ee(\u5305\u62ec: \u901a\u7528\u6a21\u677f\u529f\u80fd\u3001\u84dd\u7259\u8fde\u63a5\u76f8\u5173\u529f\u80fd)\n")}function p(){var r=e.args[0],i=n.join(o,"projects",r);if(t.existsSync(i))throw e.outputHelp(),"the package is exist or invalid package name";t.mkdirSync(i),l(i,r),t.writeFileSync(n.join(i,"index.ios.js"),"import \"./index.js\";"),t.writeFileSync(n.join(i,"index.js"),"\n    import React from 'react';\n    import { API_LEVEL, Package, Device, Service, Host } from 'miot';\n    import { PackageEvent, DeviceEvent } from 'miot';\n    import { View, Text } from 'react-native';\n\n    class App extends React.Component {\n        render() {\n            return (\n            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'powderblue' }}>\n            <Text>hello, this is a tiny plugin project of MIOT</Text>\n            <Text>API_LEVEL:{API_LEVEL}</Text>\n            <Text>NATIVE_API_LEVEL:{Host.apiLevel}</Text>\n            <Text>{Package.packageName}</Text>\n            <Text>models:{Package.models}</Text>\n            </View>\n            )\n        }\n    }\n    Package.entry(App, () => {\n        \n    })\n    "),t.mkdirSync(n.join(i,"resources")),t.mkdirSync(n.join(i,"build"))}function x(e,r){var i=n.join(o,"projects",r);if(t.existsSync(i))console.error('this project is exist or invalid project name');else{var c=n.join(o,'bin','template',e);t.existsSync(c)?(t.mkdirSync(i),a(c,i,function(e){console.log('create %s success!',r),l(i,r)})):console.error('can not create a %s project',r)}}function l(r,o){t.writeFileSync(n.join(r,"project.json"),"{ \n        \"package_path\": \""+o+"\",\n        \"min_sdk_api_level\":"+i+",\n        \"developer_id\": \""+(e.developer||'')+"\",\n        \"version_code\":1,\n        \"entrance_scene\":{\n            \"action_ids\":[],\n            \"trigger_ids\":[]\n        }\n    }"),t.writeFileSync(n.join(r,"package.json"),"{\n        \"name\": \"project-"+o.replace(/[.]/g,'-')+"\",\n        \"version\": \""+c+"\",\n        \"scripts\":{\n            \"start\":\"node ../../bin/runProject.js\"\n        },\n        \"dependencies\":{\n            \n        }\n    }")}e.version(c).usage('[options] \u5feb\u901f\u542f\u52a8\u9879\u76ee').option("-type, --type","\u9879\u76ee\u7c7b\u578b: empty\u3001wifi\u3001ble").description("\u751f\u6210\u9879\u76ee").parse(process.argv);try{!(function(){if(!e.args||e.args.length<=1)s();else{var n=e.args[0];switch(e.args[1]){case'empty':p();break;case'common':x('common',n);break;case'wifi':x('wifi',n);break;case'ble':x('ble',n);break;default:console.log('create project type value error'),s()}}})()}catch(e){console.log(e)}