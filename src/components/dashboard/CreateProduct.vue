<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { fetchData } from '../../helpers/fetchHelper';
import WarnPopup from '../WarnPopUp.vue';


const successPopUp = ref(false);
const rejectedPopUp = ref(false);
const handlePopUp = (action) => {
    if (action === 'success') {
        successPopUp.value = !successPopUp.value;
    }
    else if (action === "rejected") {
        rejectedPopUp.value = !rejectedPopUp.value;
    }
}

const handleSuccessPopUp = () => {
    handlePopUp('success');
};

const handleRejectedPopUp = () => {
    handlePopUp('rejected');
};

const data = ref({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    characteristic: '',
});

const imageData = ref({
    image: {
        file: null,
        previewUrl: null,
    },
    image2: {
        file: null,
        previewUrl: null,
    },
    image3: {
        file: null,
        previewUrl: null,
    },
    image4: {
        file: null,
        previewUrl: null,
    },
    image5: {
        file: null,
        previewUrl: null,
    },
})

const onImageChange = (event, key) => {
    const inputElement = event.currentTarget;
    const file = inputElement.files?.[0];

    if (file) {
        const imageURL = URL.createObjectURL(file);
        imageData.value[key].file = file;
        imageData.value[key].previewUrl = imageURL;
    }
};

const removeImage = (key) => {
    imageData.value[key].file = null;
    imageData.value[key].previewUrl = null;
};

const createFormData = () => {
    const formData = new FormData();
    Object.entries(data.value).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            formData.append(key, value);
        }
    });

    Object.entries(imageData.value).forEach(([key, value]) => {
        if (value.file) {
            formData.append(key, value.file);
        }
    });
    return formData;
}


const postProduct = async (e) => {

    try {
        e.preventDefault();
        const productData = createFormData();
        const response = await fetchData(`https://jr-store-self.vercel.app/api/products`, 'POST', productData);
        if (response.status != "success") {
            handleRejectedPopUp();
        }
        else {
            handleSuccessPopUp();
        }
    }
    catch (error) {
        throw new Error(error.message);
    }

}

</script>
<template>
    <section>
        <h1>Create your product</h1>
        <div class="product_container">
            <form @submit="postProduct">
                <b>Product Name</b>
                <input type="text" v-model="data.name" required>
                <b>Product description</b>
                <textarea v-model="data.description" cols="30" rows="10" required></textarea>
                <b>Category</b>
                <input type="text" v-model="data.category" required />
                <b>Subcategory</b>
                <input type="text" v-model="data.subcategory" required />
                <b>Price</b>
                <input type="number" v-model="data.price" required />
                <b>Characteristics</b>
                <textarea v-model="data.characteristic" cols="30" rows="10"></textarea>
                <div class="row">
                    <b>Image 1</b>
                    <input type="file" @change="onImageChange($event, 'image')" required />
                    <div class="preview_image">
                        <div class="remove_icon" v-if="imageData.image.previewUrl" @click="removeImage('image')">
                            <Icon icon="zondicons:close-solid" color="red" />
                        </div>
                        <img :src="imageData.image.previewUrl" v-if="imageData.image.previewUrl" />
                    </div>
                </div>
                <div class="row">
                    <b>Image 2</b>
                    <input type="file" @change="onImageChange($event, 'image2')" />
                    <div class="preview_image">
                        <div class="remove_icon" v-if="imageData.image2.previewUrl" @click="removeImage('image2')">
                            <Icon icon="zondicons:close-solid" color="red" />
                        </div>
                        <img :src="imageData.image2.previewUrl" v-if="imageData.image2.previewUrl" />
                    </div>
                </div>
                <div class="row">
                    <b>Image 3</b>
                    <input type="file" @change="onImageChange($event, 'image3')" />
                    <div class="preview_image">
                        <div class="remove_icon" v-if="imageData.image3.previewUrl" @click="removeImage('image3')">
                            <Icon icon="zondicons:close-solid" color="red" />
                        </div>
                        <img :src="imageData.image3.previewUrl" v-if="imageData.image3.previewUrl" />
                    </div>
                </div>
                <div class="row">
                    <b>Image 4</b>
                    <input type="file" @change="onImageChange($event, 'image4')" />
                    <div class="preview_image">
                        <div class="remove_icon" v-if="imageData.image4.previewUrl" @click="removeImage('image4')">
                            <Icon icon="zondicons:close-solid" color="red" />
                        </div>
                        <img :src="imageData.image4.previewUrl" v-if="imageData.image4.previewUrl" />
                    </div>
                </div>
                <div class="row">
                    <b>Image 5</b>
                    <input type="file" @change="onImageChange($event, 'image4')" />
                    <div class="preview_image">
                        <div class="remove_icon" v-if="imageData.image5.previewUrl" @click="removeImage('image5')">
                            <Icon icon="zondicons:close-solid" color="red" />
                        </div>
                        <img :src="imageData.image5.previewUrl" v-if="imageData.image5.previewUrl" />
                    </div>
                </div>

                <input type="submit" value="Send" class="btn_enviar">

            </form>

        </div>

    </section>
    <section class="gallery_section">
        <div class="gallery_row"
            v-if="imageData.image.previewUrl || imageData.image2.previewUrl || imageData.image3.previewUrl || imageData.image4.previewUrl || imageData.image5.previewUrl">
            <div class="image_box">
                <img :src="imageData.image.previewUrl" v-if="imageData.image.previewUrl" />
            </div>
            <div class="image_box">
                <img :src="imageData.image2.previewUrl" v-if="imageData.image2.previewUrl" />
            </div>
            <div class="image_box">
                <img :src="imageData.image3.previewUrl" v-if="imageData.image3.previewUrl" />
            </div>
            <div class="image_box">
                <img :src="imageData.image4.previewUrl" v-if="imageData.image4.previewUrl" />
            </div>
            <div class="image_box">
                <img :src="imageData.image5.previewUrl" v-if="imageData.image5.previewUrl" />
            </div>
        </div>
    </section>
    <WarnPopup v-if="successPopUp" icon="success" warnTitle="Product succesfully created"
        warnMessage="The product has been added to the catalog" buttonOneText="Accept"
        :firstFunction="handleSuccessPopUp" />
    <WarnPopup v-if="rejectedPopUp" icon="error" warnTitle="Error"
        warnMessage="There was an error while creating the product" buttonOneText="Accept"
        :firstFunction="handleRejectedPopUp" />
</template>
<style scoped>
h1 {
    color: white;
}

.preview_image {
    position: relative;
}

.preview_image img {
    max-width: 65px;
    height: auto;
    width: 100%;
    border-radius: 10px;
    border: 2px solid var(--slate);
}

.preview_image .remove_icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    max-width: max-content;
    max-height: max-content;
    border-radius: 100px;
    font-size: 20px;
}

.preview_image .remove_icon svg {
    background: white;
    border-radius: 100px;
}

section {
    margin-bottom: 20px;
}

.product_container form {
    display: flex;
    flex-direction: column;
}

b {
    color: white;
    font-weight: bold;
    font-size: 1.2em;
}

.row {
    background: white;
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
}

.row b {
    color: var(--slate);
    padding-left: 20px;
}

.row input {
    box-shadow: unset;
}

input,
textarea {
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.btn_enviar {
    max-width: 60%;
    margin: 0 auto;
    padding: 12px 5%;
    border-radius: 10px;
    background: var(--slate);
    border: unset;
    color: white;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease;
    margin-top: 20px;
}

input,
textarea {
    font-weight: bold;
    color: var(--slate);
    letter-spacing: 0.2px;
}

.btn_enviar:hover {
    opacity: 0.8;
}

.gallery_row {
    display: flex;
    align-items: center;
    overflow-x: scroll;
    gap: 20px;
    padding-top: 20px;
}

.gallery_row::-webkit-scrollbar {
    width: 10px;
    height: 5px;
}

.gallery_row::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.gallery_row::-webkit-scrollbar-thumb {
    background: #888;
}

.gallery_row::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.gallery_row img {
    max-width: 500px;
    height: auto;
    border-radius: 10px
}

@media (min-width:921px) {
    h1 {
        font-size: 2.8em;
    }

    section {
        max-width: 50%;
        width: 100%;
        margin: 0 auto;
    }

    .gallery_section {
        max-width: 80%;
        margin: 0 auto;
        width: 100%;
        margin-bottom: 20px;
    }
}

@media (max-width:920px) {
    section {
        margin-left: 10px;
        margin-right: 10px;
    }

    .row b {
        font-size: 14px;
    }

    .gallery_row img {
        max-width: 250px;
    }
}
</style>
