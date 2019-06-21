<script>
let error = null 
let success = false

let developer = {
  firstName: '',
  lastName: '', 
  title: '',
  company: '',
  email: '',
  notes: '',
  preference: ''
}

function handleSubmit() {
  error = null
  // TOOD: Validation
  fetch('/api', { method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(developer)})
    .then(r => r.json())
    .then(result => {
      if (result.error) {
        error = 'form'
        message = 'Bad Request, most likely invalid data'
        return
      }
      console.log('success')
      developer = {
        firstName: '', lastName: '', title: '', company: '', email: '', notes:'', preference: ''
      }
      success = true
    })
}

</script>
<section class="hero is-primary">
  <div class="hero-body">
    <h1 class="title">Form Demo</h1>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="box">
      <form class="form" on:submit|preventDefault={handleSubmit}>
        <div class="field">
          <label class="label" for="first-name">First Name</label>
          <div class="control">
            <input id="first-name" type="text" class="input" class:is-danger={error === 'firstName'} bind:value={developer.firstName} />
          </div>
          {#if error === 'firstName'}
          <p class="help is-danger">First name is required</p>
          {/if}
        </div>
        <div class="field">
          <label class="label" for="last-name">Last Name</label>
          <div class="control">
            <input id="last-name" type="text" class="input" class:is-danger={error === 'lastName'} bind:value={developer.lastName} />
          </div>
          {#if error === 'lastName'}
          <p class="help is-danger">Last name is required</p>
          {/if}
        </div>
        <div class="field">
          <label class="label" for="title">Title</label>
          <div class="control">
            <input id="title" type="text" class="input" class:is-danger={error === 'title'} bind:value={developer.title} />
          </div>
          {#if error === 'title'}
          <p class="help is-danger">Title is invalid length</p>
          {/if}
        </div>
        <div class="field">
          <label class="label" for="company">Company</label>
          <div class="control">
            <input id="company" type="text" class="input" bind:value={developer.company} />
          </div>
        </div>
        <div class="field">
          <label class="label" for="email">Email</label>
          <div class="control">
            <input id="email" type="text" class="input" bind:value={developer.email} class:is-danger={error === 'email'}/>
          </div>
          {#if error === 'email'}
          <p class="help is-danger">Email is invalid</p>
          {/if}
        </div>
        <div class="field">
          <label class="label" for="notes">Notes</label>
          <div class="control">
            <textarea id="notes" class="textarea" bind:value={developer.notes} class:is-danger={error === 'notes'} />
          </div>
          {#if error === 'notes'}
          <p class="help is-danger">Notes is too long</p>
          {/if}
        </div>
        <div class="field">
          <label class="label" for="preference">Developer Preference</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="preference" bind:group={developer.preference} value="frontend">
              Frontend 
            </label>
            <label class="radio">
              <input type="radio" name="preference" bind:group={developer.preference} value="backend">
              Backend 
            </label>
            <label class="radio">
              <input type="radio" name="preference" bind:group={developer.preference} value="data-science">
              Data Science
            </label>
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button">Submit</button>
          </div>
        </div>
        

          
 
      </form>
    </div>
  </div>
</section>
