import * as Yup from 'yup'
const imageFormats = ["image/jpeg", "image/png"];
export const CategoreySchema = Yup.object({
    categorey:Yup.string().min(2).max(30).required("Please enter department Name"),
    description:Yup.string().min(2).max(30).required("Please enter description"),
    eventlogo: Yup.mixed().required("choose a Photo")
})
export const ProfileUpdate = Yup.object({
    name:Yup.string().min(2).max(30).required("Please enter Name"),
    mob:Yup.string().min(2).max(11).required("Please enter Correct number"),
    profile_img: Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      if (value) {
        return imageFormats.includes(value.type);
      }
      return true;
    }).required("Upload Profile Photo")
})
export const BannnerUpdation = Yup.object({
    banner_text:Yup.string().min(2).max(11).required("Please enter Banner Name"),
    main_text:Yup.string().min(2).max(30).required("Please enter Main Text"),
    banner_img: Yup.mixed()
    .test("is-image", "Only image files are allowed", (value) => {
      if (value) {
        return imageFormats.includes(value.type);
      }
      return true;
    }).required("Upload Banner Image"),
    button_text:Yup.string().min(2).max(11).required("Please enter Button Text"),
})