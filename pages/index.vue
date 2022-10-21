<template>
  <div>
    <nav class="navbar">
      <div class="container-fluid">
        <a class="navbar-brand">Home Automation</a>
        <div class="d-flex">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userName }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <button
                  class="dropdown-item"
                  type="button"
                  @click.prevent="logout"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <div class="container-fluid mt-4">
      <h4>Devices</h4>
      <template v-for="(value, device) in devices" :key="device">
        <DeviceController
          :name="device"
          :modelValue="devices[device]"
          @update:modelValue="(val) => updateSwitchStatus(device, val)"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import Pusher from "pusher-js";

const router = useRouter();

const devices = reactive({
  "light a": false,
  "light b": false,
  "light c": false,
  "light d": false,
});

const userName = ref("");

async function updateSwitchStatus(device, value) {
  await $fetch("/api/switch", {
    method: "POST",
    body: { name: device, value },
    headers: {
      Authorization: localStorage.getItem("Authorization"),
    },
  });
}

async function logout() {
  localStorage.removeItem("Authorization");
  await router.replace("/login");
}

onMounted(async () => {
  const auth = localStorage.getItem("Authorization");
  if (auth) {
    try {
      const { name } = await $fetch("/api/userinfo", {
        headers: {
          Authorization: auth,
        },
      });
      userName.value = name;

      const pusher = new Pusher("95f4256352950a4a2c9a", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("my-channel");
      channel.bind("my-event", function (data) {
        devices[data.name.toLowerCase()] = data.value;
      });
    } catch (e) {
      await router.replace("/login");
    }
  } else {
    await router.replace("/login");
  }
});
</script>
