import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

//* Declaring the type for the Modal component's properties
interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

//* Modal component using React Function Component with ModalProps
export const Modal: React.FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
  //* The Modal component uses Dialog.Root as the parent container
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.DialogPortal>
        <Dialog.Overlay
          className="
                bg-amber-900/90
                backdrop-blur-sm
                fixed
                inset-0
                "
        />
        <Dialog.Content
          className="
                fixed
                drop-shadow-md
                border
                border-amber-700
                top-[50%]
                left-[50%]
                max-h-full
                h-full
                md:h-auto
                md:max-h-[85vh]
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                translate-x-[-50%]
                translate-y-[-50%]
                rounded-md
                bg-amber-800
                p-[25px]
                focus:outline-none
                "
        >
          <Dialog.Title
            className="
                    text-xl
                    text-center
                    font-bold
                    mb-4
                    "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
                    mb-5 
                    text-sm
                    leading-normal
                    text-center
                    "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className="
                        text-neutral-400
                        hover:text-white
                        absolute
                        top-[10px]
                        right-[10px]
                        inline-flex
                        h-[25px]
                        w-[25px]
                        apperance-none
                        items-center
                        justify-center
                        rounded-full
                        focus:outline-none
                        "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.DialogPortal>
    </Dialog.Root>
  );
};
