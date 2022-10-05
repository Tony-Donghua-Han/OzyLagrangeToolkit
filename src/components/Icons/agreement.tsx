import { SvgIcon, SvgIconProps } from "@mui/material";

export function AgreementIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path
                fill="currentColor"
                d="M15 3H5C3.89 3 3 3.89 3 5V10.82C5.55 8.37 9.59 8.4 12.1 10.9C14.63 13.44 14.63 17.56 12.1 20.1C11.74 20.45 11.35 20.74 10.94 21H19C20.11 21 21 20.11 21 19V9L15 3M14 10V4.5L19.5 10H14M7.5 11C5 11 3 13 3 15.5C3 16.38 3.25 17.21 3.69 17.9L.61 21L2 22.39L5.12 19.32C5.81 19.75 6.63 20 7.5 20C10 20 12 18 12 15.5S10 11 7.5 11M7.5 18C6.12 18 5 16.88 5 15.5S6.12 13 7.5 13 10 14.12 10 15.5 8.88 18 7.5 18Z"
            />
        </SvgIcon>
    );
}
