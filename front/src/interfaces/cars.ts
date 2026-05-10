import { IAdditionalBlock } from "./additionalInfoCar";
import { IBrand } from "./brand";
import { IDescriptionBlock } from "./descriptionBlocks";
import { IGallery } from "./gallery";

export interface ICars {
    id: number;
    title: string;
    brand?: IBrand;
    description: string;
    price: number;
    additional_info: IAdditionalBlock[];
    description_info: IDescriptionBlock[];
    images: IGallery[];
}