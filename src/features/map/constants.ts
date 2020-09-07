import { Center, Style, Zoom } from './types';

export const defaultZoom: Zoom = 2;
export const defaultCenter: Center = [0, 40];
export const defaultStyle: Style = 'dark';

export const styleUrls: { [style in Style]: string } = {
  dark: 'mapbox://styles/ivanrt/ckdk80nes0wb01iqminlchno4',
  light: 'mapbox://styles/ivanrt/ckdzse0bp0r2419lbj96dw07a',
  satellite: 'mapbox://styles/ivanrt/cke2hmks20xc119mpssxyiytb',
  accessible: 'mapbox://styles/ivanrt/cke16a91g0lg41aoz5zk4ddr2',
};

export const styles = Object.keys(styleUrls) as Style[];
