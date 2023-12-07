<script lang="ts">
    import Button from '$components/Button.svelte';
    import Dialog from '$components/Dialog.svelte';
    import {enhance} from '$app/forms';
    import {page} from "$app/stores";
    import LL from "$translations/i18n-svelte";

    let dialog: Dialog | any = $state();

    export function open() {
        dialog.showModal();
    }

    const enhancer = ({form}) => {
        return async ({result, update}) => {
            if (result.type === 'success') {
                dialog.close();
                form.reset(); //Asi neni nutný reset když při logoutu proběhne redirect
            }
            update();
        }
    }

</script>

<Dialog bind:dialog>
    <div>
        <h5>{$LL.login.title()}</h5>
        <!--Navbar je definovaný v +layout.svelte ale akce má na +page.server.ts, nemůžu dát akce do +layout.server.ts,
        nechám to používat akce odtamtud. Pokud bych se takhle snažila přihlásit z rules tak to padne na tom, že to
        akci nezná. Jinde používat ?/action. note: asi to jde udělat lépe-->
        <form method="POST" action="/?/login" use:enhance={enhancer}>
            {#each $page?.form ?? [] as error}
				<span class="error">
						{error}
				</span>
            {/each  }
            <label for="email">
                {$LL.login.email()}:
                <input type="email" name="email" id="email"/>
                {#each $page?.form?.email ?? [] as error}
					<span class="error">
						{$LL.login.errors.email[error]()}
					</span>
                {/each}

            </label>

            <label for="password">
                {$LL.login.password()}:
                <input type="password" name="password" id="password"/>
                {#each $page?.form?.password ?? [] as error}
					<span class="error">
						{$LL.login.errors.password[error]()}
					</span>
                {/each}
            </label>

            <Button class="full-width">{$LL.login.submit()}</Button>
        </form>
    </div>
</Dialog>

<style>
    div {
        width: 100%;
        display: flex;
        flex-direction: column;

        align-items: center;
        gap: 20px;
    }
</style>
