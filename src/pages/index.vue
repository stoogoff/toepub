<template>
	<section class="mx-auto w-2/3">
		<loading-overlay v-if="loading" />
		<div class="grid grid-cols-3 gap-6 mb-6">
			<div class="col-span-2">
				<tab-group>
					<tab-panel title="Content">
						<add-files :files="files" @add="addFiles" @update="setFiles" />
					</tab-panel>
					<tab-panel title="Images">
						<add-images
							:images="images"
							:selected-image="coverImage"
							@add="addImages"
							@update="setImages"
							@select="setCoverImage"
						/>
					</tab-panel>
					<tab-panel title="Metadata">
						<div class="instruction">Enter the title, author name and other information for your book. Title and Author are required but everything else is optional.</div>
						<div class="py-2">
							<validate-field :value="title" :rules="rules.title" v-slot="{ error, message }">
								<text-input label="Title *" v-model="title" :error="error" :message="message" />
							</validate-field>
							<validate-field :value="author" :rules="rules.author" v-slot="{ error, message }">
								<text-input label="Author *" v-model="author" :error="error" :message="message" />
							</validate-field>
							<text-input label="Copyright" v-model="rights" />
							<validate-field :value="date" :rules="rules.date" v-slot="{ error, message }">
								<text-input label="Published Date" v-model="date" :error="error" :message="message" placeholder="YYYY-MM-DD" />
							</validate-field>
							<text-input label="Publisher" v-model="publisher" />
						</div>
					</tab-panel>
				</tab-group>
			</div>
			<div>
				<div class="mt-16">
					<status-message :status="hasFiles ? 'success' : 'normal'">Files uploaded</status-message>
					<status-message :status="hasImages ? 'success' : 'normal'">Images uploaded</status-message>
					<status-message :status="hasCoverImage ? 'success' : 'normal'">Cover image selected</status-message>
					<status-message :status="metadataStatus">Metadata complete</status-message>

					<div class="instruction mt-2">Press the convert button and your files will be converted to EPUB format. Copies of your EPUB will be kept on our server for 24 hours before being deleted.</div>
					<button-action
						block
						type="primary"
						:disabled="!canContinue"
						@click="upload"
					>Convert</button-action>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { download } from '~/utils/file'
import { required, format, validate, validateBatch } from '~/utils/validators'

export default {
	name: 'IndexPage',

	data() {
		return {
			hasChanged: false,
			loading: false,
			files: [],
			images: [],
			coverImage: null,
			title: '',
			author: '',
			rights: '',
			date: '',
			publisher: '',
		}
	},

	watch: {
		title() {
			this.hasChanged = true
		},

		author() {
			this.hasChanged = true
		},
	},

	computed: {
		hasFiles() {
			return this.files.length > 0
		},

		hasImages() {
			return this.images.length > 0
		},

		hasCoverImage() {
			return this.coverImage !== null
		},

		metadataStatus() {
			console.log(this.metadataIsValid)

			if(this.metadataIsValid) return 'success'
			else if(this.hasChanged) return 'error'

			return 'normal'
		},

		canContinue() {
			return this.hasFiles && this.metadataIsValid
		},

		metadataIsValid() {
			return validateBatch(this.rules, {
				title: this.title,
				author: this.author,
				date: this.date,
			})
		},

		rules() {
			return {
				title: [required()],
				author: [required()],
				date: [format(/^(\d{4}-\d{2}-\d{2})?$/, 'YYYY-MM-DD')],
			}
		},
	},

	methods: {
		addFiles(files) {
			this.files = [...this.files, ...files]
		},

		setFiles(files) {
			this.files = [ ...files ]
		},

		addImages(images) {
			this.images = [...this.images, ...images]
		},

		setImages(images) {
			this.images = [ ...images ]
		},

		setCoverImage(image) {
			this.coverImage = image
		},

		async upload() {
			const data = new FormData()

			// files
			this.files.forEach(file => data.append(file.name, file))

			// cover image
			if(this.coverImage !== null) data.append('cover', this.coverImage)

			// other images
			this.images.filter(i => img !== this.coverImage).forEach(img => data.append(img.name, img))

			// required fields
			data.append('title', this.title)
			data.append('author', this.author)

			// optional fields
			if(!!this.rights) data.append('rights', this.rights)
			if(!!this.date) data.append('date', this.date)
			if(!!this.publisher) data.append('publisher', this.publisher)

			this.loading = true

			try {
				const response = await this.$axios.post('/api/upload', data, {
					responseType: 'blob',
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				const [ prefix, fileName ] = response.headers['content-disposition'].split('"')

				download(fileName, response.data)

				this.files = []
				this.title = ''
			}
			catch(ex) {
				console.log(ex)
			}

			this.loading = false
		}
	},
}

</script>
