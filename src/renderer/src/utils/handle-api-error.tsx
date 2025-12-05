import { Dialog } from "@renderer/components/Dialog";
import { isAxiosError } from "axios";
import { overlay } from "overlay-kit";

export interface ApiErrorResponse {
  code: string;
  message: string;
  timestamp: string;
}

export function handleApiError(error: Error) {
  if (!isAxiosError<ApiErrorResponse>(error)) return;

  const message = error.response?.data?.message;

  overlay.closeAll();

  overlay.open((overlayProps) => {
    setTimeout(() => overlayProps.close(), 3000);

    return (
      <Dialog open={overlayProps.isOpen} onOpenChange={overlayProps.close}>
        <Dialog.Wrapper width={400} gap={24} className="!rounded-2xl !p-6">
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <svg
                className="h-7 w-7 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-center text-lg leading-relaxed font-medium">{message}</p>
          </div>
        </Dialog.Wrapper>
      </Dialog>
    );
  });
}
