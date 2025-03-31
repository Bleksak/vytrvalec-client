<script lang="ts">
	import type { ChangeEventHandler } from "svelte/elements";

    let {
		id,
		name,
		checked = $bindable(false),
		disabled = undefined,
        onChange,
	}: {
		id?: string;
		name?: string;
		checked?: boolean;
		disabled?: boolean;
        onChange?: ChangeEventHandler<HTMLInputElement> 
	} = $props();
</script>

<label class="switch">
    <input type="checkbox" onchange={onChange} bind:checked>
    <span class="slider round"></span>
</label>

<style>
    .switch {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 20px;
        margin: 10px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #005cab;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #005cab;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(14px);
        -ms-transform: translateX(14px);
        transform: translateX(14px);
    }

    .slider.round {
        border-radius: 20px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>