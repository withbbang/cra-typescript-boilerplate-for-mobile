/**
 * 커스텀 window 타입
 * Native -> Web 호출을 위한 타입
 */
export interface CustomWindow extends Window {
  goBack?: (data?: any) => any;
  onResult?: (data?: any) => any;
  onResume?: (data?: any) => any;
  // TODO: add others...
}

export interface TypeJavascriptInterface {
  action: string;
  bridge: string;
  data?: any;
}

export interface SVGProps {
  type?: string;
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
}
