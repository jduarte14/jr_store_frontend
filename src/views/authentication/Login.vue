<script setup lang="ts">
import { ref } from 'vue';
import WarnPopUp from'../../components/WarnPopUp.vue';
import { useRouter } from 'vue-router';
const email = ref('');
const password = ref('');
const successPopUp = ref(false);
const rejectedPopUp = ref(false);
const router = useRouter();
const handlePopUp =(action: string)=>{
    if (action === 'success'){
        successPopUp.value = !successPopUp.value;  
    }
    else if (action === "rejected") {
        rejectedPopUp.value = !rejectedPopUp.value;
    }
}

const handleSuccessPopUp = () => {
  handlePopUp('success');
  router.push('/dashboard')
};

const handleRejectedPopUp = () => {
  handlePopUp('rejected');
};

const handleSubmit = async (e:Event) => {
    try {
        e.preventDefault();
        const userData = new URLSearchParams();
        userData.append("password", password.value);
        userData.append("email", email.value);
        const response = await fetch('https://jrstore-production.up.railway.app/auth/user/login', {
            method: "POST",
            body: userData,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        if (response.ok) {
            const data = await response.json();
            await localStorage.setItem("token", "user_logged");        
            handlePopUp('success');
        } else {
            console.error("There was an error whit the authentication");
            handlePopUp('rejected');
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
}
</script>
<template>
    <section>
        <aside>
            <h2>Login</h2>
            <form @submit="handleSubmit">
                <input type="text" v-model="email" placeholder="enter your email" />
                <input type="password" v-model="password" placeholder="enter your password">
                <input type="submit" value="Login" id="enviar">
            </form>
        </aside>
    
    </section>
        <WarnPopUp v-if="successPopUp" icon="success" warnTitle="Logged" warnMessage="Now you can access to the dashboard" buttonOneText="Accept" :firstFunction="handleSuccessPopUp"/>
        <WarnPopUp v-if="rejectedPopUp " icon="error"  warnTitle="Error" warnMessage="There was an error whit the authentication" buttonOneText="Accept" :firstFunction="handleRejectedPopUp"/>

</template>
<style scoped>
section {
    display: grid;
    place-content: center;
    height: 70vh;
}

aside {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #efefef;
    padding: 10px;
    position:relative;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

aside h2 {
    text-align: center;
}

form input {
    padding: 8px 10px;
    margin: 5px;
    border-radius: 10px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border: 2px solid #5c5e69;
}

#enviar {
    background: var(--black);
    color: white;
    font-weight: bold;
    transition: 0.3s ease;
    cursor: pointer;
}

#enviar:hover {
    opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (min-width:921px) {
    form {
        width: 300px;
    }

    input {
        padding: 11px 10px;
    }
}
</style>