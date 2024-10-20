import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        title?: string | undefined;
        titleHover?: string | undefined;
        fullScreenOnMobile?: boolean | undefined;
        onClose?: (() => void) | undefined;
        style: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type HaDialogProps = typeof __propDef.props;
export type HaDialogEvents = typeof __propDef.events;
export type HaDialogSlots = typeof __propDef.slots;
export default class HaDialog extends SvelteComponent<HaDialogProps, HaDialogEvents, HaDialogSlots> {
}
export {};
