import { toast } from "@/hooks/use-toast";

export const ShowToast = (title: string, type: string) => {
  toast({
    title: title,
    className: `${type === "success" && "bg-green-500 capitalize text-white"} ${
      type === "error" && "bg-red-600 capitalize text-white"
    }`,
  });
};
